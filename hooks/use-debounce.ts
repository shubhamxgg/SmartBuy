import { useRef, useEffect } from "react";

export const useDebounce = (
  callback: (...args: any[]) => void,
  delay: number
) => {
  const handler = useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = (...args: any[]) => {
    if (handler.current) {
      clearTimeout(handler.current);
    }
    handler.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (handler.current) {
        clearTimeout(handler.current);
      }
    };
  }, [callback, delay]);

  return debouncedCallback;
};
