import useEth from "../../contexts/EthContext/useEth";

function EndProposalsRegisteringBtns({setCurrentStatus}) {
  const { state: { contract, accounts } } = useEth();

  
  const read =  async () => {
    await contract.methods.endProposalsRegistering().send({from: accounts[0]});
    const value = await contract.methods.workflowStatus().call({from: accounts[0]});
    setCurrentStatus(value);
  };

  return (
    <div className="btns">

      <button onClick={read}>
        close submissions
      </button>

    </div>
  );
}

export default EndProposalsRegisteringBtns;
