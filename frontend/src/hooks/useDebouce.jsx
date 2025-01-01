import React, { useEffect } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = React.useState("");
  useEffect(() => {
    const handler = setTimeout(() => {
      console.log("value", value);
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
};

export default useDebounce;
