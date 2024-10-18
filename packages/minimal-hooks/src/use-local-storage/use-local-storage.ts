import { useMemo, useState, useEffect, useCallback } from 'react';

import { setStorage, getStorage, removeStorage } from '@minimals/utils/local-storage';

// ----------------------------------------------------------------------

/**
 * Custom hook to manage state with local storage.
 *
 * @param {string} key - The key for the local storage.
 * @param {T} initialState - The initial state value.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.initOnLoad=false] - Whether to initialize the local storage on load.
 *
 * @returns {UseLocalStorageReturn<T>} - An object containing:
 * - `state`: The current state.
 * - `resetState`: A function to reset the state to the initial value and remove it from local storage.
 * - `updateState`: A function to update the state and save it to local storage.
 * - `updateField`: A function to update a specific field in the state and save it to local storage.
 *
 * @example
 * const { state, resetState, updateState, updateField } = useLocalStorage('settings', initialState);
 *
 * return (
 *   <div>
 *     <p>State: {JSON.stringify(state)}</p>
 *     <button onClick={() => updateState({name: 'John', age: 20})}>Set Name</button>
 *     <button onClick={() => updateField('name', 'John')}>Set Name</button>
 *     <button onClick={resetState}>Reset</button>
 *   </div>
 * );
 */

export type UseLocalStorageReturn<T> = {
  state: T;
  resetState: (defaultState?: T) => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useLocalStorage<T>(
  key: string,
  initialState?: T,
  options?: {
    initOnLoad?: boolean;
  }
): UseLocalStorageReturn<T> {
  const isValuePresent = !!getStorage(key);
  const storedValue: T = getStorage(key) ?? initialState;

  const [state, set] = useState<T>(storedValue);

  const { initOnLoad = true } = options ?? {};
  const hasMultipleValues = state && typeof state === 'object';

  useEffect(() => {
    if (storedValue) {
      if (hasMultipleValues) {
        set((prevValue) => ({ ...prevValue, ...storedValue }));
      } else {
        set(storedValue);
      }

      if (!isValuePresent && initOnLoad) {
        setStorage<T>(key, storedValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setState = useCallback(
    (newState: T | Partial<T>) => {
      if (hasMultipleValues) {
        set((prevValue) => {
          const updatedState = { ...prevValue, ...newState } as T;

          setStorage<T>(key, updatedState);
          return updatedState;
        });
      } else {
        setStorage<T>(key, newState as T);
        set(newState as T);
      }
    },
    [key, hasMultipleValues]
  );

  const setField = useCallback(
    (name: keyof T, updateValue: T[keyof T]) => {
      if (hasMultipleValues) {
        setState({ [name]: updateValue } as Partial<T>);
      }
    },
    [hasMultipleValues, setState]
  );

  const resetState = useCallback(
    (defaultState?: T) => {
      if (defaultState) {
        set(defaultState);
      }
      removeStorage(key);
    },
    [key]
  );

  const memoizedValue = useMemo(
    () => ({
      state,
      setState,
      setField,
      resetState,
    }),
    [resetState, setField, setState, state]
  );

  return memoizedValue;
}
