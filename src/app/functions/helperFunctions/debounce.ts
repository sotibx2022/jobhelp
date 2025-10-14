import { useEffect, useRef } from 'react';
interface UseDebounceProps {
  callback: () => void;
  delay: number;
  dependencies?: any[];
}
export const useDebounce = ({
  callback,
  delay,
  dependencies = []
}: UseDebounceProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    // Set new timeout
    timerRef.current = setTimeout(() => {
      callback();
    }, delay);
    // Cleanup on unmount or dependency change
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [...dependencies, delay]); // Re-run when dependencies or delay change
};