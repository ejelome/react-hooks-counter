[![Netlify Status](https://api.netlify.com/api/v1/badges/9b3713ab-ff67-4289-9811-e0ce28c1bfa9/deploy-status)](https://app.netlify.com/sites/ejelome-react-hooks-counter/deploys)

# react-hooks-counter

Learn [React](https://reactjs.org) [Hooks](https://reactjs.org/docs/hooks-intro.html) with a counter

---

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->

**Table of Contents**

- [react-hooks-counter](#react-hooks-counter)
  - [Demo](#demo)
  - [Setup](#setup)
  - [Usage](#usage)
  - [Lessons](#lessons)
    - [1. Introduction](#1-introduction)
    - [2. Rules of Hooks](#2-rules-of-hooks)
      - [2.1. Do's](#21-dos)
      - [2.2. Dont's](#22-donts)
    - [3. Basic Hooks](#3-basic-hooks)
      - [3.1. useState](#31-usestate)
      - [3.2. useEffect](#32-useeffect)
      - [3.3. useContext](#33-usecontext)
  - [References](#references)
  - [License](#license)

<!-- markdown-toc end -->

---

## Demo

See <https://ejelome-react-hooks-counter.netlify.app>.

---

## Setup

| Command                                            | Description          |
| :------------------------------------------------- | :------------------- |
| `npm [install`&vert;`isntall`&vert;`add`&vert;`i]` | Install dependencies |

---

## Usage

| Command                          | Description       |
| :------------------------------- | :---------------- |
| `npm start`                      | Start dev server  |
| `npm [test`&vert;`tst`&vert;`t]` | Start test runner |
| `npm run build`                  | Build app bundle  |

---

## Lessons

### 1. Introduction

- [Hooks](https://reactjs.org/docs/hooks-intro.html) were introduced in [React v16.8](https://reactjs.org/blog/2019/02/06/react-v16.8.0.html)
- They let use of state and other React features without using `class`es
- They allow reuse of stateful logic without changing component hierarchy
- They don’t work inside `class`es and their names always start with `use`
- They are special functions that lets "hook into" React features (e.g. `useState` for state)

### 2. Rules of Hooks

React Hooks require **two** important rules to be followed.

#### 2.1. Do's

Call Hooks &hellip;

1. at the top level to ensure the same order to correctly preserve state of Hooks
2. from React functions (e.g. function components and custom Hooks)

#### 2.2. Dont's

Don't call Hooks &hellip;

1. inside loops, conditions or nested functions
2. from regular JavaScript functions

> **NOTES:**
>
> - These two important rules can be checked with [eslint-plugin-react-hooks](https://npmjs.com/package/eslint-plugin-react-hooks)
> - `eslint-plugin-react-hooks` is included in [CRA](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/package.json#L29)'s [eslint-config-react-app](https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/package.json#L29)

### 3. Basic Hooks

#### 3.1. useState

<details>
  <summary>src/App.js</summary>

```diff
-import "./App.css";
+import React, { useState } from "react";

-import logo from "./logo.svg";
+const App = () => {
+  const initialState = 0;
+  const [count, setCount] = useState(initialState);
+
+  const handleDecrement = () => setCount((prevCount) => prevCount - 1);
+
+  const handleIncrement = () => setCount((prevCount) => prevCount + 1);

-function App() {
   return (
-    <div className="App">
-      <header className="App-header">
-        <img src={logo} className="App-logo" alt="logo" />
-        <p>
-          Edit <code>src/App.js</code> and save to reload.
-        </p>
-        <a
-          className="App-link"
-          href="https://reactjs.org"
-          target="_blank"
-          rel="noopener noreferrer"
-        >
-          Learn React
-        </a>
-      </header>
-    </div>
+    <>
+      <h1>Counter</h1>
+      <button onClick={handleDecrement}>-</button>
+      <code>{count}</code>
+      <button onClick={handleIncrement}>+</button>
+    </>
   );
-}
+};

 export default App;
```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-counter-lesson-31-903k9)

> **NOTES:**
>
> - `useState` or _State Hook_ declares a _state variable_
> - The state variable preserves values between function calls
> - It accepts an optional initial state which doesn't have to be an object (`{}`)
> - If no initial state is specified, then the state variable's value is `undefined`
> - The specified initial state is only used during the first render of the component
> - If the initial state comes from expensive computation, pass it as a function to lazy load
> - It returns a pair of values as an array (`[]`): `[<current state>, <function to update it>]`
> - The returned array can be destructured with JavaScript's [Array destructuring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Array_destructuring)
> - Current state can be read directly the same way how regular variables are read
> - Calling the update function is done similarly how regular functions are called
> - If the update function returns the same value as current state, re-render is skipped
> - Unlike `class`' `this.setState`, `set<State>` replaces current state and not merge it
> - To compute with the previous state, pass a function with state as its argument
> - To replicate merging, pass a function updater and return with [Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
> - For more complicated state&mdash;objects with multiple sub-values; use [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) instead
> - Calling the update function outside a callback throws an error (`Too many re-renders`)
> - _Stateless components_ using React state are called _function components_

#### 3.2. useEffect

<details>
  <summary>src/App.js</summary>

```diff
-import React, { useState } from "react";
+import React, { useEffect, useState } from "react";

 const App = () => {
   const initialState = 0;
   const [count, setCount] = useState(initialState);

   const handleDecrement = () => setCount((prevCount) => prevCount - 1);

   const handleIncrement = () => setCount((prevCount) => prevCount + 1);

+  useEffect(() => {
+    console.log(count);
+    return console.clear;
+  }, [count]);
+
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
```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-counter-lesson-32-qfnmt)

> **NOTES:**
>
> - `useEffect` or _Effect Hook_ allows side-effects in function components
> - Similar with `useState` (or _State Hook_), it can be used more than once
> - It is the combination of `class`' lifecycle methods: `component(Did(Mount|Update)|WillUnmount)`
> - Unlike `componentDid(Mount|Update)`, it doesn't block the browser when updating the screen
> - It runs _after_ the first and subsequent re-renders
> - The callbacks it contains are what we call "effects"
> - The callback is fired _after_ the browser has painted
> - It is implemented in two ways: with or without cleanup
> - Without cleanup is only calling an effect function
> - With cleanup is `return`ing a function to do cleanup
> - The cleanup is applied _before_ the next effect is called
> - To skip effect, pass an array (`[]`) as second argument
> - If array is empty, effect is applied only on first render
> - If array has state and its value is similar to previous state, effect is skipped
> - Using `useState` inside `useEffect` throws an error (`Maximum update depth exceeded`)

#### 3.3. useContext

<details>
  <summary>src/App.js</summary>

```diff
-import React, { useState } from "react";
+import React, { createContext, useContext, useEffect, useState } from "react";

-const App = () => {
-  const initialState = 0;
-  const [count, setCount] = useState(initialState);
-
-  const handleDecrement = () => setCount((prevCount) => prevCount - 1);
-
-  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
-
-  return (
-    <>
-      <h1>Counter</h1>
-      <button onClick={handleDecrement}>-</button>
-      <code>{count}</code>
-      <button onClick={handleIncrement}>+</button>
-    </>
-  );
-};
+const initialContext = {};
+const CounterContext = createContext(initialContext);

-export default App;
+const CounterProvider = ({ children }) => {
+  const initialCount = 0;
+  const [count, setCount] = useState(initialCount);

-import React, { useEffect, useState } from "react";
+  const increment = () => setCount((prevCount) => prevCount + 1);
+  const decrement = () => setCount((prevCount) => prevCount - 1);

-const App = () => {
-  const initialState = 0;
-  const [count, setCount] = useState(initialState);
+  const { Provider } = CounterContext;
+  const values = { count, increment, decrement };

-  const handleDecrement = () => setCount((prevCount) => prevCount - 1);
+  return <Provider value={values}>{children}</Provider>;
+};

-  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
+const Counter = () => {
+  const { count, increment, decrement } = useContext(CounterContext);

   useEffect(() => {
     console.log(count);
+
     return console.clear;
   }, [count]);

   return (
     <>
       <h1>Counter</h1>
-      <button onClick={handleDecrement}>-</button>
+      <button onClick={decrement}>-</button>
       <code>{count}</code>
-      <button onClick={handleIncrement}>+</button>
+      <button onClick={increment}>+</button>
     </>
   );
 };

+const App = () => {
+  return (
+    <CounterProvider>
+      <Counter />
+    </CounterProvider>
+  );
+};
+
 export default App;
```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-router-lesson-33-xpzde)

> **NOTES:**
>
> - `useContext` enables passing data through nested component tree
> - It allows sharing values of the parent down to each child components (a.k.a. global)
> - It's used primarily for data that's used by multiple components at different nested levels
> - `useContext(*Context)` is the equivalent of `class`' `*Context.Consumer`
> - `useContext(*Context)` is read-only and can only be subscribed into
> - `*Context.Provider*` is where to modify and provide the context value
> - It accepts a context object returned from `createContext`
> - It then returns the `value` of that context from `*Context.Provider`
> - The context `value` is from _nearest_ `.*Context.Provider*` of the calling component
> - If the context `value` changes, it will trigger a re-render to the calling component
> - The `createContext` creates the object context
> - The initial context `value` can be set in `createContext`

---

## References

- [React](https://reactjs.org): [Hooks](https://reactjs.org/docs/hooks-intro.html)

---

## License

`react-hooks-counter` is licensed under [MIT](./LICENSE).
