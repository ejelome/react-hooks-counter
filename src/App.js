import React, { useMemo, useState } from "react";

import useLogger from "./useLogger";

const App = () => {
  const initialCount = () => 0;
  const [count, setCount] = useState(initialCount);

  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () => setCount((prevCount) => prevCount - 1);

  let expensiveCallback = (n) => {
    const numbers = [...Array(n + 1).keys()].map((i) => i);
    return numbers[numbers.length - 1] - count;
  };
  const expensiveTotal = 10000000; // 10,000,000
  const expensiveValue = useMemo(() => expensiveCallback(expensiveTotal), [
    expensiveCallback,
  ]);

  useLogger(count);

  return (
    <>
      <h1>Counter</h1>
      <button onClick={handleDecrement}>-</button>
      <code>
        {count} / {expensiveValue}
      </code>
      <button onClick={handleIncrement}>+</button>
    </>
  );
};

export default App;
