function Winner({ winningProposalID }) {

  return (
    <code>
      {`The Winner : `}

      <span className="secondary-color" >
        <div><strong>Winner : {winningProposalID}</strong></div>
      </span>
    </code>
  );
}

export default Winner;
