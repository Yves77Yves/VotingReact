import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import Voter from "./Voter";
import VoterBtns from "./VoterBtns";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";
import Proposal from "./Proposal";
import ProposalBtns from "./ProposalBtns";
import Vote from "./Vote";
import VoteBtns from "./VoteBtns";
import EndProposalsRegistering from "./EndProposalsRegistering";
import EndProposalsRegisteringBtns from "./EndProposalsRegisteringBtns";
import EndVotingSession from "./EndVotingSession";
import EndVotingSessionBtns from "./EndVotingSessionBtns";
import StartProposalsRegistering from "./StartProposalsRegistering";
import StartProposalsRegisteringBtns from "./StartProposalsRegisteringBtns";
import StartVotingSession from "./StartVotingSession";
import Tally from "./Tally";
import TallyBtns from "./TallyBtns";
import Winner from "./Winner";
import StartVotingSessionBtns from "./StartVotingSessionBtns";
import WinnerBtns from "./WinnerBtns";
import Events from "./Events";


function Demo() {
  const { state } = useEth();
  const [isRegistered, setIsRegistered] = useState();
  const [hasVoted, setHasVoted] = useState();
  const [votedProposalId, setVotedProposalId] = useState();
  const [currentStatus, setCurrentStatus] = useState();
  const [description, setDescription] = useState();
  const [voteCount, setVoteCount] = useState();
  const [id, setId] = useState();
  const [winningProposalID, setWinningProposalID] = useState();
  const [eventValue, setEventValue] = useState("");
  const [oldEvents, setOldEvents] = useState();
  const [errorValue, setErrorValue] = useState();



  const demo =
    <>
      <table>
        <td>
          <div className="contract-container">
            <Voter isRegistered={isRegistered} hasVoted={hasVoted} votedProposalId={votedProposalId} />
            <VoterBtns setIsRegistered={setIsRegistered} setHasVoted={setHasVoted} setVotedProposalId={setVotedProposalId} setEventValue={setEventValue} setOldEvents={setOldEvents} setErrorValue={setErrorValue}/>
          </div>

          <Cta />
          <div className="contract-container">
            <StartProposalsRegistering currentStatus={currentStatus} />
            <StartProposalsRegisteringBtns setCurrentStatus={setCurrentStatus} />
          </div>

          <Cta />
          <div className="contract-container">
            <Proposal description={description} voteCount={voteCount} />
            <ProposalBtns setDescription={setDescription} setVoteCount={setVoteCount} />
          </div>

          <Cta />
          <div className="contract-container">
            <EndProposalsRegistering currentStatus={currentStatus} />
            <EndProposalsRegisteringBtns setCurrentStatus={setCurrentStatus} />
          </div>

          <Cta />
          <div className="contract-container">
            <StartVotingSession currentStatus={currentStatus} />
            <StartVotingSessionBtns setCurrentStatus={setCurrentStatus} />
          </div>

          <Cta />
          <div className="contract-container">
            <Vote currentStatus={id} />
            <VoteBtns setCurrentStatus={setId} />
          </div>

          <Cta />
          <div className="contract-container">
            <EndVotingSession currentStatus={currentStatus} />
            <EndVotingSessionBtns setCurrentStatus={setCurrentStatus} />
          </div>

          <Cta />
          <div className="contract-container">
            <Tally currentStatus={currentStatus} />
            <TallyBtns setCurrentStatus={setCurrentStatus} />
          </div>

          <Cta />
          <div className="contract-container">
            <Winner winningProposalID={winningProposalID} />
            <WinnerBtns setWinningProposalID={setWinningProposalID} />
          </div>
        </td>
        <td>
          <div className="contract-container">
            <Events eventValue={eventValue} oldEvents={oldEvents}  errorValue={errorValue}/>
          </div>
        </td>
      </table>

    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
