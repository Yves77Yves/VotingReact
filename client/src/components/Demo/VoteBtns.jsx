import { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function VoteBtns({ setId }) {
  const { state: { contract, accounts } } = useEth();

  const [inputIdValue, setIdValue] = useState("");



const handleIdValueChange = e => {
  setIdValue(e.target.value);
};




  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputIdValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = inputIdValue;
    await contract.methods.setVote(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <div onClick={write} className="input-btn">
        vote(<input
          type="text"
          placeholder="Id Proposal"
          value={inputIdValue}
          onChange={handleIdValueChange}
        />)
      </div>

    </div>
  );
}

export default VoteBtns;
