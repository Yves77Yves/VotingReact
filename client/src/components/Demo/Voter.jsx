import { useRef, useEffect } from 'react';

function Voter({ isRegistered, hasVoted, votedProposalId }) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [isRegistered, hasVoted]);

  return (
    <code>
      {`Add and Get a Voter : `}

      <span className="secondary-color" ref={spanEle}>
        <div><strong>isRegistered : {isRegistered}</strong></div>
        <div><strong>hasVoted : {hasVoted}</strong></div>
        <div><strong>votedProposalId : {votedProposalId}</strong></div>
      </span>

    </code>
  );
}

export default Voter;
