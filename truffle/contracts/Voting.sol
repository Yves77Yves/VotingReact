// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Voting
 * @dev Implement workflow and functions :
 * @dev addVoter/getVoter 
 * @dev addProposal/getOneProposal
 * @dev setVote
 * @dev startProposalsRegistering/endProposalsRegistering/startVotingSession/endVotingSession/tallyVote
 * @author YSP
 * @notice inherite ownable.sol from openzeppelin
 */

contract Voting is Ownable {

    uint public winningProposalID;

    /**
     * @dev Structure of Voter
     */
    
    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }

    /**
     * @dev Structure of Proposal
     */

    struct Proposal {
        string description;
        uint voteCount;
    }

    /**
     * @dev 6 workflow status
     */

    enum  WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }

    WorkflowStatus public workflowStatus;

    
    /**
    * @dev proposals array
    * @dev voters mapping
    */

    Proposal[] proposalsArray;
    mapping (address => Voter) voters;

    /**
    * @dev  events
    */


    event VoterRegistered(address voterAddress); 
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);
    event ProposalRegistered(uint proposalId);
    event Voted (address voter, uint proposalId);

    /**
    * @dev modifier
    */
    
    modifier onlyVoters() {
        require(voters[msg.sender].isRegistered, "You're not a voter");
        _;
    }
    
    /**
    * @notice Define all the Getters
    */
    
    /**
    * @dev getVoter 
    * @param _addr voter's address
    */

    function getVoter(address _addr) external onlyVoters view returns (Voter memory) {
        return voters[_addr];
    }

    /**
    * @dev getOneProposal 
    * @param _id proposal's ID
    */
    
    function getOneProposal(uint _id) external onlyVoters view returns (Proposal memory) {
        return proposalsArray[_id];
    }

 
    
    /**
    * @notice Registration
    */
    
    /**
    * @dev addVoter 
    * @param _addr voter's address
    */

    function addVoter(address _addr) external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Voters registration is not open yet');
        require(voters[_addr].isRegistered != true, 'Already registered');
    
        voters[_addr].isRegistered = true;
        emit VoterRegistered(_addr);
    }
 

 
    
    /**
    * @notice Proposal
    */
    
    /**
    * @dev addproposal 
    * @param _desc proposal's description
    */

    function addProposal(string calldata _desc) external onlyVoters {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Proposals are not allowed yet');
        require(keccak256(abi.encode(_desc)) != keccak256(abi.encode("")), 'Vous ne pouvez pas ne rien proposer'); // facultatif
        // voir que desc est different des autres

        Proposal memory proposal;
        proposal.description = _desc;
        proposalsArray.push(proposal);
        emit ProposalRegistered(proposalsArray.length-1);
    }

    
    /**
    * @notice Vote
    */
    
    /**
    * @dev setVote 
    * @param _id proposal's ID
    */

    function setVote( uint _id) external onlyVoters {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        require(voters[msg.sender].hasVoted != true, 'You have already voted');
        require(_id < proposalsArray.length, 'Proposal not found'); // pas obligé, et pas besoin du >0 car uint

        voters[msg.sender].votedProposalId = _id;
        voters[msg.sender].hasVoted = true;
        proposalsArray[_id].voteCount++;

        emit Voted(msg.sender, _id);
    }

    /**
    * @notice workflow states
    */
    
    /**
    * @dev startProposalsRegistering 
    * @dev set WorkflowStatus to RegisteringVoters
    * @dev create genesis proposal
    */


    function startProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.RegisteringVoters, 'Registering proposals cant be started now');
        workflowStatus = WorkflowStatus.ProposalsRegistrationStarted;
        
        Proposal memory proposal;
        proposal.description = "GENESIS";
        proposalsArray.push(proposal);
        
        emit WorkflowStatusChange(WorkflowStatus.RegisteringVoters, WorkflowStatus.ProposalsRegistrationStarted);
    }

    /**
    * @dev endProposalsRegistering 
    * @dev set WorkflowStatus to ProposalsRegistrationEnded
    * @dev emit an event
    */

    function endProposalsRegistering() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationStarted, 'Registering proposals havent started yet');
        workflowStatus = WorkflowStatus.ProposalsRegistrationEnded;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationStarted, WorkflowStatus.ProposalsRegistrationEnded);
    }

    /**
    * @dev startVotingSession 
    * @dev set WorkflowStatus to VotingSessionStarted
    * @dev emit an event
    */

    function startVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.ProposalsRegistrationEnded, 'Registering proposals phase is not finished');
        workflowStatus = WorkflowStatus.VotingSessionStarted;
        emit WorkflowStatusChange(WorkflowStatus.ProposalsRegistrationEnded, WorkflowStatus.VotingSessionStarted);
    }

    /**
    * @dev endVotingSession 
    * @dev set WorkflowStatus to VotingSessionEnded
    * @dev emit an event
    */

    function endVotingSession() external onlyOwner {
        require(workflowStatus == WorkflowStatus.VotingSessionStarted, 'Voting session havent started yet');
        workflowStatus = WorkflowStatus.VotingSessionEnded;
        emit WorkflowStatusChange(WorkflowStatus.VotingSessionStarted, WorkflowStatus.VotingSessionEnded);
    }

    /**
    * @dev tallyVotes 
    * @dev set WorkflowStatus to VotesTallied
    * @dev count number of votes for all proposals
    * @dev declare the winning proposal : the one with the most votes
    * @dev emit an event
    */

   function tallyVotes() external onlyOwner {
       require(workflowStatus == WorkflowStatus.VotingSessionEnded, "Current status is not voting session ended");
       uint _winningProposalId;
      for (uint256 p = 0; p < proposalsArray.length; p++) {
           if (proposalsArray[p].voteCount > proposalsArray[_winningProposalId].voteCount) {
               _winningProposalId = p;
          }
       }
       winningProposalID = _winningProposalId;
       
       workflowStatus = WorkflowStatus.VotesTallied;
       emit WorkflowStatusChange(WorkflowStatus.VotingSessionEnded, WorkflowStatus.VotesTallied);
    }
}