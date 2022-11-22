import { useState } from 'react';
import useEth from "../../contexts/EthContext/useEth";

function ProposalBtns({ setDescription, setVoteCount }) {
  const { state: { contract, accounts } } = useEth();
  const [inputIdValue, setInputIdValue] = useState("");
  const [inputDescriptionValue, setDescriptionIdValue] = useState("");


  const handleInputIdChange = e => {
    setInputIdValue(e.target.value);
  };

  const handleInputDescriptionChange = e => {
    setDescriptionIdValue(e.target.value);
  };



  const read = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputIdValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = inputIdValue;
    const ReadValue = await contract.methods.getOneProposal(newValue).call({ from: accounts[0] });
    setDescription(ReadValue.description);
    setVoteCount(ReadValue.voteCount);
  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputDescriptionValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newValue = inputDescriptionValue;
    await contract.methods.addProposal(newValue).send({ from: accounts[0] });
  };

  return (
    <div className="btns">

      <div onClick={write} className="input-btn">
        submit(<input
          type="text"
          placeholder="addresse"
          value={inputDescriptionValue}
          onChange={handleInputDescriptionChange}
        />)
      </div>

      <div onClick={read} className="input-btn">
        get(<input
          type="text"
          placeholder="Id"
          value={inputIdValue}
          onChange={handleInputIdChange}
        />)
      </div>

    </div>
  );
}

export default ProposalBtns;
