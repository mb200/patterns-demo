/* eslint-disable @typescript-eslint/no-explicit-any */
import isEqual from 'lodash/isEqual';
import { useCallback, useEffect, useRef, useState } from 'react';

function getFromLocalStorage<T>(key: string): T | null {
  try {
    const value = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value) as T;
    }
  } catch (e) {
    localStorage.removeItem(key);
    console.error(`Error occurred while reading object from LocalStorage @ ${key}: ${e}`);
  }

  return null;
}

function saveToLocalStorage<T>(key: string, value: T | null): void {
  if (value === null) {
    localStorage.removeItem(key);

    return;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error occurred while writing to LocalStorage @ ${key}: ${e}`);
  }
}

function useLocalStorage<T>(key: string): [T | null, (value: T | null) => void] {
  const subscription = useRef<Subscription<T>>();

  const [state, setInternalState] = useState<T | null>(() => getFromLocalStorage(key));

  const setValue = useCallback(
    (value: T | null) => {
      if (!isEqual(state, value)) {
        setInternalState(value);
        saveToLocalStorage(key, value);
        // Notify all of the other instances in this window
        subscription.current?.emit(value);
      }
    },
    [key, state],
  );

  // Subscribe to changes made by other components in this same window.
  useEffect(() => {
    subscription.current = createSharedState(key, setInternalState);

    return () => subscription.current?.unsubscribe();
  }, [key]);

  return [state, setValue];
}

type SharedState = {
  [key: string]: { callbacks: ((value: any) => void)[] };
};
const sharedState: SharedState = {};

type Subscription<T> = {
  unsubscribe(): void;
  emit(value: T | null): void;
};

function createSharedState<T>(key: string, callback: (value: T) => void): Subscription<T> {
  if (!sharedState[key]) {
    sharedState[key] = { callbacks: [] };
  }
  sharedState[key].callbacks.push(callback);

  return {
    unsubscribe() {
      const arr = sharedState[key].callbacks;
      const index = arr.indexOf(callback);
      if (index > -1) {
        arr.splice(index, 1);
      }
    },
    emit(value) {
      sharedState[key].callbacks.forEach((cb) => {
        if (callback !== cb) {
          cb(value);
        }
      });
    },
  };
}

export { useLocalStorage, getFromLocalStorage, saveToLocalStorage };
