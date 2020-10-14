import React, { createContext, useContext, useEffect, useState } from "react";

import useLogger from "./useLogger";

const initialContext = {};
const CounterContext = createContext(initialContext);

const CounterProvider = ({ children }) => {
  const initialCount = 0;
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((prevCount) => prevCount + 1);
  const decrement = () => setCount((prevCount) => prevCount - 1);

  const { Provider } = CounterContext;
  const values = { count, increment, decrement };

  return <Provider value={values}>{children}</Provider>;
};

const Counter = () => {
  const { count, increment, decrement } = useContext(CounterContext);

  useLogger(count);

  return (
    <>
      <h1>Counter</h1>
      <button onClick={decrement}>-</button>
      <code>{count}</code>
      <button onClick={increment}>+</button>
    </>
  );
};

const App = () => {
  return (
    <CounterProvider>
      <Counter />
    </CounterProvider>
  );
};

export default App;
