import { useEffect } from "react";

const useLogger = (state) =>
  useEffect(() => {
    console.log(state);

    return console.clear;
  }, [state]);

export default useLogger;
