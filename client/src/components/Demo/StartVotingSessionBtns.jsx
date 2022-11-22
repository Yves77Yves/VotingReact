import useEth from "../../contexts/EthContext/useEth";

function StartVotingSessionBtns({setCurrentStatus}) {
  const { state: { contract, accounts } } = useEth();

  
  const read =  async () => {
    await contract.methods.startVotingSession().send({from: accounts[0]});
    const value = await contract.methods.workflowStatus().call({from: accounts[0]});
    setCurrentStatus(value);
  };

  return (
    <div className="btns">

      <button onClick={read}>
        open poll
      </button>

    </div>
  );
}

export default StartVotingSessionBtns;
