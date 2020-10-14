import React, { useReducer } from "react";

import useLogger from "./useLogger";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

const Counter = () => {
  const initialState = 0;
  const [count, dispatch] = useReducer(reducer, initialState);

  const handleIncrement = () => dispatch({ type: "increment" });
  const handleDecrement = () => dispatch({ type: "decrement" });

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

const App = () => <Counter />;

export default App;
