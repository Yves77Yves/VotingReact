import { useRef, useEffect } from 'react';

function Vote({ id }) {
  const spanEle = useRef(null);

  useEffect(() => {
    spanEle.current.classList.add("flash");
    const flash = setTimeout(() => {
      spanEle.current.classList.remove("flash");
    }, 300);
    return () => {
      clearTimeout(flash);
    };
  }, []);

  return (
    <code>
      {`Vote for a Proposal : `}

      <span className="secondary-color" ref={spanEle}>
        <div><strong>Id proposal : {id}</strong></div>
      </span>

    </code>
  );
}

export default Vote;
