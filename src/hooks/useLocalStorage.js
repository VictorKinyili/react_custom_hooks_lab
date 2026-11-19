import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue = null) {

  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue);
      } catch {
        return storedValue;
      }
    }
    return initialValue;
  });

  useEffect(() => {
    const value = typeof state === "string" ? state : JSON.stringify(state);
    localStorage.setItem(key, value);
  }, [key, state]);

  return [state, setState];
}