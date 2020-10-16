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
    - [4. Custom Hooks](#4-custom-hooks)
    - [5. Additional Hooks](#5-additional-hooks)
      - [5.1. useReducer](#51-usereducer)
      - [5.2. useCallback](#52-usecallback)
      - [5.3. useMemo](#53-usememo)
      - [5.4. useRef](#54-useref)
    - [6. Esoteric Hooks](#6-esoteric-hooks)
      - [6.1. useImperativeHandle](#61-useimperativehandle)
      - [6.2. useLayoutEffect](#62-uselayouteffect)
        - [6.2.1. With useEffect (flickers)](#621-with-useeffect-flickers)
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

### 4. Custom Hooks

<details>
  <summary>src/useLogger.js</summary>

```diff
+import { useEffect } from "react";
+
+const useLogger = (state) =>
+  useEffect(() => {
+    console.log(state);
+    return console.clear;
+  }, [state]);
+
+export default useLogger;
```

</details>

<details>
  <summary>src/App.js</summary>

```diff
 import React, { createContext, useContext, useEffect, useState } from "react";

+import useLogger from "./useLogger";
+
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

-  useEffect(() => {
-    console.log(count);
-
-    return console.clear;
-  }, [count]);
+  useLogger(count);

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
```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-counter-lesson-4-wpoe7)

> **NOTES:**
>
> - Custom Hooks allows extracting component logic into reusable functions
> - They eliminate the need for using [render props](https://reactjs.org/docs/render-props.html) or [HOC](https://reactjs.org/docs/higher-order-components.html) to share component logic
> - They are JavaScript functions which name starts with `use` that can call other Hooks
> - They enable extracting common code between two functions into a separate function
> - They are conventions following the design of Hooks rather than React features
> - They must be prefixed with `use` to be able to be checked against [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html)
> - Similar with `use(State|Effect)` Hooks, they don't share state and effects

### 5. Additional Hooks

#### 5.1. useReducer

<details>
  <summary>src/App.js</summary>

```diff
-import React, { createContext, useContext, useEffect, useState } from "react";
+import React, { useReducer } from "react";

 import useLogger from "./useLogger";

-const initialContext = {};
-const CounterContext = createContext(initialContext);
-
-const CounterProvider = ({ children }) => {
-  const initialCount = 0;
-  const [count, setCount] = useState(initialCount);
-
-  const increment = () => setCount((prevCount) => prevCount + 1);
-  const decrement = () => setCount((prevCount) => prevCount - 1);
-
-  const { Provider } = CounterContext;
-  const values = { count, increment, decrement };
-
-  return <Provider value={values}>{children}</Provider>;
+const reducer = (state, action) => {
+  switch (action.type) {
+    case "increment":
+      return state + 1;
+    case "decrement":
+      return state - 1;
+    default:
+      return state;
+  }
 };

 const Counter = () => {
-  const { count, increment, decrement } = useContext(CounterContext);
+  const initialState = 0;
+  const [count, dispatch] = useReducer(reducer, initialState);
+
+  const handleIncrement = () => dispatch({ type: "increment" });
+  const handleDecrement = () => dispatch({ type: "decrement" });

   useLogger(count);

   return (
     <>
       <h1>Counter</h1>
-      <button onClick={decrement}>-</button>
+      <button onClick={handleDecrement}>-</button>
       <code>{count}</code>
-      <button onClick={increment}>+</button>
+      <button onClick={handleIncrement}>+</button>
     </>
   );
 };

-const App = () => {
-  return (
-    <CounterProvider>
-      <Counter />
-    </CounterProvider>
-  );
-};
+const App = () => <Counter />;

 export default App;
```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-counter-lesson-51-wpoe7)

> **NOTES:**
>
> - `useReducer` or _Reducer Hook_ is an alternative for `useState` for complex state logic
> - While `useState` is for one-off primitives, `useReducer` is for multiple sub-values
> - It accepts a reducer (a function) with `(state, action)` and returns a `newState`
> - It returns a pair of values as an array (`[]`): `[<state>, <dispatch>]`
> - `state` contains the current state along with its modified sub-values
> - `dispatch` contains `action` with `type` to determine the action used on `state`
> - `dispatch` can contain a `payload` to provide a previous `state` to be modified
> - Pass `dispatch` as `value` on `*Context.Provider` for optimized deep updates
> - To lazy load initialization, pass an `init(initialState)` function as third argument
> - Returning the same value skips re-rendering its children or firing effects

#### 5.2. useCallback

<details>
  <summary>src/App.js</summary>

```diff
-import React, { useReducer } from "react";
+import React, { useCallback, useEffect, useState } from "react";

 import useLogger from "./useLogger";

-const reducer = (state, action) => {
-  switch (action.type) {
-    case "increment":
-      return state + 1;
-    case "decrement":
-      return state - 1;
-    default:
-      return state;
-  }
-};
-
-const Counter = () => {
-  const initialState = 0;
-  const [count, dispatch] = useReducer(reducer, initialState);
-
-  const handleIncrement = () => dispatch({ type: "increment" });
-  const handleDecrement = () => dispatch({ type: "decrement" });
+const App = () => {
+  const initialCount = () => 0;
+  const [count, setCount] = useState(initialCount);
+
+  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
+  const handleDecrement = () => setCount((prevCount) => prevCount - 1);
+
+  const initialTheme = () => "light";
+  const [theme, setTheme] = useState(initialTheme);
+
+  const handleToggleTheme = () =>
+    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
+
+  const themes = {
+    light: {
+      background: "white",
+      color: "black",
+    },
+    dark: {
+      background: "black",
+      color: "white",
+    },
+  };
+
+  const initialTitle = () => "hello, world";
+  const [title, setTitle] = useState(initialTitle);
+
+  let getRandomTitle = (count) => {
+    return `Counter #${count}`;
+  };
+
+  getRandomTitle = useCallback(getRandomTitle, [count]);
+
+  useEffect(() => {
+    setTitle(() => getRandomTitle(count));
+    console.log(`getRandomTitle(${count})`);
+  }, [getRandomTitle]);

   useLogger(count);

   return (
-    <>
-      <h1>Counter</h1>
+    <div style={themes[theme]}>
+      <h1>{title}</h1>
       <button onClick={handleDecrement}>-</button>
       <code>{count}</code>
       <button onClick={handleIncrement}>+</button>
-    </>
+      <button onClick={handleToggleTheme}>{theme}</button>
+    </div>
   );
 };

-const App = () => <Counter />;
-
 export default App;
```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-router-lesson-52-be5ei)

> **NOTES:**
>
> - `useCallback` returns a cached ([momized](https://wikipedia.org/wiki/Memoization)) callback
> - It checks for [referential equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) between renders on functions
> - It ensures that the callback is only re-created when its dependencies changed
> - It prevents re-creation of the same callback when the component using it re-renders
> - It accepts a callback and its dependencies that will only trigger its re-creation when changed

#### 5.3. useMemo

<details>
  <summary>src/App.js</summary>

```diff
-import React, { useCallback, useEffect, useState } from "react";
+import React, { useMemo, useState } from "react";

 import useLogger from "./useLogger";

 const App = () => {
   const initialCount = () => 0;
   const [count, setCount] = useState(initialCount);

   const handleIncrement = () => setCount((prevCount) => prevCount + 1);
   const handleDecrement = () => setCount((prevCount) => prevCount - 1);

-  const initialTheme = () => "light";
-  const [theme, setTheme] = useState(initialTheme);
-
-  const handleToggleTheme = () =>
-    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
-
-  const themes = {
-    light: {
-      background: "white",
-      color: "black",
-    },
-    dark: {
-      background: "black",
-      color: "white",
-    },
+  let expensiveCallback = (n) => {
+    const numbers = [...Array(n + 1).keys()].map((i) => i);
+    return numbers[numbers.length - 1] - count;
   };
-
-  const initialTitle = () => "hello, world";
-  const [title, setTitle] = useState(initialTitle);
-
-  let getRandomTitle = (count) => {
-    return `Counter #${count}`;
-  };
-
-  getRandomTitle = useCallback(getRandomTitle, [count]);
-
-  useEffect(() => {
-    setTitle(() => getRandomTitle(count));
-    console.log(`getRandomTitle(${count})`);
-  }, [getRandomTitle]);
+  const expensiveTotal = 10000000; // 10,000,000
+  const expensiveValue = useMemo(() => expensiveCallback(expensiveTotal), [
+    expensiveCallback,
+  ]);

   useLogger(count);

   return (
-    <div style={themes[theme]}>
-      <h1>{title}</h1>
+    <>
+      <h1>Counter</h1>
       <button onClick={handleDecrement}>-</button>
-      <code>{count}</code>
+      <code>
+        {count} / {expensiveValue}
+      </code>
       <button onClick={handleIncrement}>+</button>
-      <button onClick={handleToggleTheme}>{theme}</button>
-    </div>
+    </>
   );
 };

 export default App;
```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-counter-lesson-53-fnq10)

> **NOTES:**
>
> - `useMemo` returns a cached (momized) value
> - It checks for referential equality between renders on values
> - It ensures that the callback is only invoked when its dependencies changed
> - It prevents invoking the same callback when the component using it re-renders
> - It accepts an invoked callback and its dependencies that will only trigger its re-computation when changed

#### 5.4. useRef

<details>
  <summary>src/App.js</summary>

```diff
-import React, { useCallback, useEffect, useState } from "react";
+import React, { useRef, useState } from "react";

 import useLogger from "./useLogger";

 const App = () => {
   const initialCount = () => 0;
   const [count, setCount] = useState(initialCount);

-  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
-  const handleDecrement = () => setCount((prevCount) => prevCount - 1);
-
-  const initialTheme = () => "light";
-  const [theme, setTheme] = useState(initialTheme);
-
-  const handleToggleTheme = () =>
-    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
-
-  const themes = {
-    light: {
-      background: "white",
-      color: "black",
-    },
-    dark: {
-      background: "black",
-      color: "white",
-    },
-  };
-
-  const initialTitle = () => "hello, world";
-  const [title, setTitle] = useState(initialTitle);
-
-  let getRandomTitle = (count) => {
-    return `Counter #${count}`;
-  };
-
-  getRandomTitle = useCallback(getRandomTitle, [count]);
-
-  useEffect(() => {
-    setTitle(() => getRandomTitle(count));
-    console.log(`getRandomTitle(${count})`);
-  }, [getRandomTitle]);
-
-  useLogger(count);
-
-  return (
-    <div style={themes[theme]}>
-      <h1>{title}</h1>
-      <button onClick={handleDecrement}>-</button>
-      <code>{count}</code>
-      <button onClick={handleIncrement}>+</button>
-      <button onClick={handleToggleTheme}>{theme}</button>
-    </div>
-  );
-};
-
-export default App;
-import React, { useMemo, useState } from "react";
-
-import useLogger from "./useLogger";
-
-const App = () => {
-  const initialCount = () => 0;
-  const [count, setCount] = useState(initialCount);
+  const initialElement = null;
+  const codeRef = useRef(initialElement);

   const handleIncrement = () => setCount((prevCount) => prevCount + 1);
   const handleDecrement = () => setCount((prevCount) => prevCount - 1);

-  let expensiveCallback = (n) => {
-    const numbers = [...Array(n + 1).keys()].map((i) => i);
-    return numbers[numbers.length - 1] - count;
+  const handleHideShow = () => {
+    let e = codeRef.current;
+    let visibility = e.style.visibility || "visible";
+    e.style.visibility = visibility === "visible" ? "hidden" : "visible";
   };
-  const expensiveTotal = 10000000; // 10,000,000
-  const expensiveValue = useMemo(() => expensiveCallback(expensiveTotal), [
-    expensiveCallback,
-  ]);

   useLogger(count);

   return (
     <>
       <h1>Counter</h1>
       <button onClick={handleDecrement}>-</button>
-      <code>
-        {count} / {expensiveValue}
-      </code>
+      <code ref={codeRef}>{count}</code>
       <button onClick={handleIncrement}>+</button>
+      <button onClick={handleHideShow}>hide/show</button>
     </>
   );
 };

 export default App;
```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-router-lesson-54-svnbj)

> **NOTES:**
>
> - `useRef` returns a mutable object accessed with `.current`
> - It accepts an optional `initialValue` assigned to `current` property
> - If no `initialValue` is specified, `current`'s property value is `undefined`
> - It then creates a plain JavaScript object containing the property: `current`
> - If passed as `ref` value in a component, it sets the value to that DOM node
> - The DOM node passed to `ref` is similar with [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector)
> - The returned object exists for the full lifetime of the component
> - The returned object is the same object after component re-renders
> - Changing the returned object value does not trigger a re-render

### 6. Esoteric Hooks

> _These hooks might create more problems than it solves, so it's best to avoid using them._

#### 6.1. useImperativeHandle

<details>
  <summary>src/App.js</summary>

```diff
-import React, { useRef, useState } from "react";
+import React, { forwardRef, useImperativeHandle, useRef } from "react";

-import useLogger from "./useLogger";
+let FancyInput = (props, ref) => {
+  const inputRef = useRef();

-const App = () => {
-  const initialCount = () => 0;
-  const [count, setCount] = useState(initialCount);
+  useImperativeHandle(ref, () => ({
+    focus: () => {
+      inputRef.current.focus();
+    },
+  }));

-  const initialElement = null;
-  const codeRef = useRef(initialElement);
+  return <input ref={inputRef} />;
+};

-  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
-  const handleDecrement = () => setCount((prevCount) => prevCount - 1);
+FancyInput = forwardRef(FancyInput);

-  const handleHideShow = () => {
-    let e = codeRef.current;
-    let visibility = e.style.visibility || "visible";
-    e.style.visibility = visibility === "visible" ? "hidden" : "visible";
-  };
+const App = () => {
+  const initialElement = null;
+  const fancyInputRef = useRef(initialElement);

-  useLogger(count);
+  const handleFocus = () => {
+    console.log(fancyInputRef.current); // only have focus property
+    fancyInputRef.current.focus();
+  };

   return (
     <>
-      <h1>Counter</h1>
-      <button onClick={handleDecrement}>-</button>
-      <code ref={codeRef}>{count}</code>
-      <button onClick={handleIncrement}>+</button>
-      <button onClick={handleHideShow}>hide/show</button>
+      <FancyInput ref={fancyInputRef} />
+      <button onClick={handleFocus}>focus</button>
     </>
   );
 };

 export default App;

```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-counter-lesson-61-82shf)

> **NOTES:**
>
> - `useImperativeHandle` modifies the returned DOM node it is ref'd with
> - It is required to be used along with `forwardRef`
> - It allows modifying or replacing DOM events

#### 6.2. useLayoutEffect

##### 6.2.1. With useEffect (flickers)

<details>
  <summary>src/App.js</summary>

```diff
-import React, { forwardRef, useImperativeHandle, useRef } from "react";
-
-let FancyInput = (props, ref) => {
-  const inputRef = useRef();
-  useImperativeHandle(ref, () => ({
-    focus: () => {
-      inputRef.current.focus();
-    },
-  }));
-  return <input ref={inputRef} />;
-};
-
-FancyInput = forwardRef(FancyInput);
+import React, { useEffect, useRef } from "react";

 const App = () => {
-  const initialElement = null;
-  const fancyInputRef = useRef(initialElement);
+  const initialValue = null;
+  const h1Ref = useRef(initialValue);

-  const handleFocus = () => {
-    console.log(fancyInputRef.current); // only have focus property
-    fancyInputRef.current.focus();
-  };
+  useEffect(() => {
+    h1Ref.current.style.display = "none";
+  });
+
+  const n = 10000000;
+  const expensiveValue = [...Array(n + 1).keys()].map((i) => i);
+  const lastCount = expensiveValue[expensiveValue.length - 1];

-  return (
-    <>
-      <FancyInput ref={fancyInputRef} />
-      <button onClick={handleFocus}>focus</button>
-    </>
-  );
+  return <h1 ref={h1Ref}>{`Last Count: ${lastCount}`}</h1>;
 };

 export default App;
```

</details>

[&#9654; Run code &rarr;](https://codesandbox.io/s/react-hooks-counter-lesson-621-d1vum)

</details>

---

## References

- [React](https://reactjs.org): [Hooks](https://reactjs.org/docs/hooks-intro.html)

---

## License

`react-hooks-counter` is licensed under [MIT](./LICENSE).
