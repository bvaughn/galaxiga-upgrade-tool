import { useEffect, useLayoutEffect, useRef, useState } from "react";

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

  // Sync changes to local storage
  useLayoutEffect(() => {
    window.dispatchEvent(
      new StorageEvent("storage", {
        key,
        newValue: committedValuesRef.current.value || "",
        oldValue: committedValuesRef.current.prevValue || "",
      })
    );

    localStorageSetItem(key, committedValuesRef.current.value);
  }, [key, value]);

  return [value, setValue];
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
