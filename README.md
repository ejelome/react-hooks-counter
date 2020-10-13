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

---

## References

- [React](https://reactjs.org): [Hooks](https://reactjs.org/docs/hooks-intro.html)

---

## License

`react-hooks-counter` is licensed under [MIT](./LICENSE).
