import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function VoterBtns({ setIsRegistered,  setHasVoted, setVotedProposalId, setEventValue, setOldEvents, setErrorValue }) {
  const { state: { contract, accounts } } = useEth();
  const [inputReadValue, setInputReadValue] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = e => {
      setInputValue(e.target.value);
  };

  const handleInputReadChange = e => {
    setInputReadValue(e.target.value);
};

useEffect(() => {
  (async function () {

     let oldEvents= await contract.getPastEvents('VoterRegistered', {
        fromBlock: 0,
        toBlock: 'latest'
      });
      let oldies=[];
      oldEvents.forEach(event => {
          oldies.push(event.returnValues.voterAddress);
      });
      setOldEvents(oldies);

      await contract.events.VoterRegistered({fromBlock:"earliest"})
      .on('data', event => {
        let lesevents = event.returnValues.voterAddress;
        setEventValue(lesevents);
        setErrorValue();
      })          
      .on('changed', changed => console.log(changed))
      .on('error', err => console.log(err))
      .on('connected', str => console.log(str))
  })();
}, [contract, setEventValue, setOldEvents, setErrorValue])
  

  const read = async e  => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputReadValue === "") {
      alert("Please enter a value to write.");
      return;
    }
    const newReadValue = inputReadValue;
    const ReadValue = await contract.methods.getVoter(newReadValue).call({from: accounts[0]});
    setIsRegistered(ReadValue.isRegistered? "yes": "no");
    setHasVoted(ReadValue.hasVoted? "yes": "no");
    setVotedProposalId(ReadValue.votedProposalId);

  };

  const write = async e => {
    if (e.target.tagName === "INPUT") {
      return;
    }
    if (inputValue === "") {
      alert("Please enter a value to write.");
      return;
    }

    /*
    const newValue = inputValue;
    await contract.methods.addVoter(newValue).send({ from: accounts[0] });
    */

    const newValue = inputValue;
    (async () => {
      try {
        await contract.methods.addVoter(newValue).send({ from: accounts[0] })
      } catch (e) {
          setErrorValue(e.code);
          setEventValue();
      }
  })()


  };

  return (
    <div className="btns">

      
<div onClick={write} className="input-btn">
        add(<input
          type="text"
          placeholder="addresse"
          value={inputValue}
          onChange={handleInputChange}
        />)
      </div>

      <div onClick={read} className="input-btn">
        get(<input
          type="text"
          placeholder="addresse"
          value={inputReadValue}
          onChange={handleInputReadChange}
        />)
      </div>


    </div>
  );
}

export default VoterBtns;
