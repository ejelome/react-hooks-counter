import React, { useLayoutEffect, useRef } from "react";

const App = () => {
  const initialValue = null;
  const h1Ref = useRef(initialValue);

  useLayoutEffect(() => {
    h1Ref.current.style.display = "none";
  });

  const n = 10000000;
  const expensiveValue = [...Array(n + 1).keys()].map((i) => i);
  const lastCount = expensiveValue[expensiveValue.length - 1];

  return <h1 ref={h1Ref}>{`Last Count: ${lastCount}`}</h1>;
};

export default App;
