import React, { forwardRef, useImperativeHandle, useRef } from "react";

let FancyInput = (props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
  }));

  return <input ref={inputRef} />;
};

FancyInput = forwardRef(FancyInput);

const App = () => {
  const initialElement = null;
  const fancyInputRef = useRef(initialElement);

  const handleFocus = () => {
    console.log(fancyInputRef.current); // only have focus property
    fancyInputRef.current.focus();
  };

  return (
    <>
      <FancyInput ref={fancyInputRef} />
      <button onClick={handleFocus}>focus</button>
    </>
  );
};

export default App;
