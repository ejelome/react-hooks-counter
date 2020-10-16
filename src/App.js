import React, { useState } from "react";

import useLogger from "./useLogger";

const App = () => {
  const initialState = 0;
  const [count, setCount] = useState(initialState);

  const handleDecrement = () => setCount((prevCount) => prevCount - 1);
  const handleIncrement = () => setCount((prevCount) => prevCount + 1);

  useLogger(count);

  return (
    <>
      <h1>Counter</h1>
      <button onClick={handleDecrement}>-</button>
      <code>{count}</code>
      <button onClick={handleIncrement}>+</button>
    </>
  );
};

export default App;
