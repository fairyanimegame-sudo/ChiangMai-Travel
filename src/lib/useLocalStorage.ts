import { useCallback, useMemo, useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  window.addEventListener("storage", callback);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
}

function emitChange() {
  listeners.forEach((listener) => listener());
}

function readRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const getSnapshot = useCallback(() => readRaw(key), [key]);

  const raw = useSyncExternalStore(subscribe, getSnapshot, () => undefined);

  const isLoaded = raw !== undefined;

  const value = useMemo<T>(() => {
    if (raw === null || raw === undefined) return initialValue;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return initialValue;
    }
  }, [raw, initialValue]);

  const setStoredValue = useCallback(
    (next: T | ((prev: T) => T)) => {
      let prev = initialValue;
      const current = readRaw(key);
      if (current !== null) {
        try {
          prev = JSON.parse(current) as T;
        } catch {
          prev = initialValue;
        }
      }
      const resolved = next instanceof Function ? next(prev) : next;
      try {
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        return;
      }
      emitChange();
    },
    [key, initialValue],
  );

  return [value, setStoredValue, isLoaded] as const;
}
