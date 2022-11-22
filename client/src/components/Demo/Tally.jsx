function EndTally({ currentStatus }) {

  return (
    <code>
      {`Tally : `}

      <span className="secondary-color" >
        <div><strong>currentStatus : {currentStatus}</strong></div>
      </span>
    </code>
  );
}

export default EndTally;
