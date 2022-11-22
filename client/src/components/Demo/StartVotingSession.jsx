function StartVotingSession({ currentStatus }) {

  return (
    <code>
      {`Open poll : `}

      <span className="secondary-color" >
        <div><strong>currentStatus : {currentStatus}</strong></div>
      </span>
    </code>
  );
}

export default StartVotingSession;
