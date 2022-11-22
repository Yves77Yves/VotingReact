import { useRef, useEffect } from 'react';

function Proposal({ description, voteCount }) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, [description, voteCount]);

  return (
    <code>
      {`Submit and Get a Proposal : `}

      <span className="secondary-color" ref={spanEle}>
        <div><strong>description : {description}</strong></div>
        <div><strong>voteCount : {voteCount}</strong></div>
      </span>

    </code>
  );
}

export default Proposal;
