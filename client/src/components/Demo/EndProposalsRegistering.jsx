function endProposalsRegistering({ currentStatus }) {

  return (
    <code>
      {`close proposal submissions : `}

      <span className="secondary-color" >
        <div><strong>currentStatus : {currentStatus}</strong></div>
      </span>
    </code>
  );
}

export default endProposalsRegistering;
