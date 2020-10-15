import React, { useRef, useState } from "react";

import useLogger from "./useLogger";

const App = () => {
  const initialCount = () => 0;
  const [count, setCount] = useState(initialCount);

  const initialElement = null;
  const codeRef = useRef(initialElement);

  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () => setCount((prevCount) => prevCount - 1);

  const handleHideShow = () => {
    let e = codeRef.current;
    let visibility = e.style.visibility || "visible";
    e.style.visibility = visibility === "visible" ? "hidden" : "visible";
  };

  useLogger(count);

  return (
    <>
      <h1>Counter</h1>
      <button onClick={handleDecrement}>-</button>
      <code ref={codeRef}>{count}</code>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleHideShow}>hide/show</button>
    </>
  );
};

export default App;
