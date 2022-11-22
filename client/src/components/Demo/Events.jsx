import { useRef, useEffect } from 'react';

function Events({ eventValue, oldEvents, errorValue }) {
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
      {`Last message : `}

      <span className="secondary-color" ref={spanEle}>
        <div ><strong> {errorValue ? 'Error : ' : eventValue? 'Adress : ': ''}{eventValue} {errorValue}  </strong></div>
        {/*<div><strong>oldEvents : {oldEvents}</strong></div>*/}
      </span>

    </code>
  );
}

export default Events;
