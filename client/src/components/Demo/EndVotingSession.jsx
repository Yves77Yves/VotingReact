function EndVotingSession({ currentStatus }) {

  return (
    <code>
      {`Close poll : `}

      <span className="secondary-color" >
        <div><strong>currentStatus : {currentStatus}</strong></div>
      </span>
    </code>
  );
}

export default EndVotingSession;
