import useEth from "../../contexts/EthContext/useEth";

function WinnerBtns({setWinningProposalID}) {
  const { state: { contract, accounts } } = useEth();

  
  const read =  async () => {
    const value = await contract.methods.winningProposalID().call({from: accounts[0]});
    setWinningProposalID(value);
  };

  return (
    <div className="btns">

      <button onClick={read}>
        get winner
      </button>

    </div>
  );
}

export default WinnerBtns;
