import { useCallback, useLayoutEffect, useRef, useState } from "react";

export default function useLocalStorage<Value>(
  key: string,
  defaultValue: Value
): [value: Value, setValue: (value: Value) => void] {
  const [value, setValue] = useState<Value>(() => {
    const storedValue = localStorageGetItem(key);
    if (storedValue != null) {
      return JSON.parse(storedValue);
    } else {
      return defaultValue;
    }
  });

  // Sync changes to React state and local storage
  const setValueWrapper = useCallback(
    (value: Value) => {
      setValue(value);

      const newValue = JSON.stringify(value);
      const oldValue = committedValuesRef.current.prevValue || "";

      localStorageSetItem(key, newValue);

      window.dispatchEvent(
        new StorageEvent("storage", {
          key,
          newValue,
          oldValue,
        })
      );
    },
    [key]
  );

  const committedValuesRef = useRef<{
    prevValue: string | null;
    value: string;
  }>({
    prevValue: null,
    value: JSON.stringify(value),
  });
  useLayoutEffect(() => {
    committedValuesRef.current.prevValue = committedValuesRef.current.value;
    committedValuesRef.current.value = JSON.stringify(value);
  });

  // Sync changes from local storage
  useLayoutEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (
        key === event.key &&
        event.newValue &&
        event.newValue !== JSON.stringify(value)
      ) {
        setValue(JSON.parse(event.newValue));
      }
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [key, value]);

  return [value, setValueWrapper];
}

// Helper methods

export function localStorageGetItem(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    return null;
  }
}

export function localStorageRemoveItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {}
}

export function localStorageSetItem(key: string, value: string): void {
  try {
    return localStorage.setItem(key, value);
  } catch (error) {}
}
