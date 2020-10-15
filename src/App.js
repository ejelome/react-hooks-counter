import React, { useCallback, useEffect, useState } from "react";

import useLogger from "./useLogger";

const App = () => {
  const initialCount = () => 0;
  const [count, setCount] = useState(initialCount);

  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () => setCount((prevCount) => prevCount - 1);

  const initialTheme = () => "light";
  const [theme, setTheme] = useState(initialTheme);

  const handleToggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  const themes = {
    light: {
      background: "white",
      color: "black",
    },
    dark: {
      background: "black",
      color: "white",
    },
  };

  const initialTitle = () => "hello, world";
  const [title, setTitle] = useState(initialTitle);

  let getRandomTitle = (count) => {
    return `Counter #${count}`;
  };

  getRandomTitle = useCallback(getRandomTitle, [count]);

  useEffect(() => {
    setTitle(() => getRandomTitle(count));
    console.log(`getRandomTitle(${count})`);
  }, [getRandomTitle]);

  useLogger(count);

  return (
    <div style={themes[theme]}>
      <h1>{title}</h1>
      <button onClick={handleDecrement}>-</button>
      <code>{count}</code>
      <button onClick={handleIncrement}>+</button>
      <button onClick={handleToggleTheme}>{theme}</button>
    </div>
  );
};

export default App;
