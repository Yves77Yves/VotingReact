import useEth from "../../contexts/EthContext/useEth";
import Address from "./Address";


function Title() {

  const {  accounts }  = useEth();

  return (
    <div className="web3stuff">
        <h2> Adresse connectée </h2>
        <h3> <Address accounts={accounts}/> </h3>
        <br/><br/>
        <h2>Déroulé du Vote</h2>
        <br/>

    </div>
  );
}


export default Title;