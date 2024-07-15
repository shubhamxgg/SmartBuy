import { useCallback, useRef } from 'react';

export function useDebounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    ((...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => func(...args), wait);
    }) as T,
    [func, wait]
  );
}