import { useCallback, useRef } from "react";

// Inspired by use-double-tap
export function useDoubleTap(
  callback: () => void,
  threshold = 300
): { onClick: () => void } {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const onClick = useCallback(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        timer.current = null;
      }, threshold);
    } else {
      clearTimeout(timer.current);
      timer.current = null;
      callback();
    }
  }, [callback, threshold]);

  return {
    onClick,
  };
}
