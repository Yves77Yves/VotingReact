import useEth from "../../contexts/EthContext/useEth";

function TallyBtns({setCurrentStatus}) {
  const { state: { contract, accounts } } = useEth();

  
  const write =  async () => {
    await contract.methods.tallyVotes().send({from: accounts[0]});
    const value = await contract.methods.workflowStatus().call({from: accounts[0]});
    setCurrentStatus(value);
  };

  return (
    <div className="btns">

      <button onClick={write}>
        tally
      </button>

    </div>
  );
}

export default TallyBtns;
