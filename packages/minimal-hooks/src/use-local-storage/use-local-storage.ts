import { useMemo, useState, useEffect, useCallback } from 'react';

import { setStorage, getStorage, removeStorage } from '@minimals/utils/local-storage';

// ----------------------------------------------------------------------

/**
 * Custom hook to manage state with local storage.
 *
 * @param {string} key - The key for the local storage.
 * @param {T} initialState - The initial state value.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.initOnload=false] - Whether to initialize the local storage on load.
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
  resetState: () => void;
  updateState: (updateState: T | Partial<T>) => void;
  updateField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useLocalStorage<T>(
  key: string,
  initialState?: T,
  options?: {
    initOnload?: boolean;
  }
): UseLocalStorageReturn<T> {
  const storedValue: T = getStorage(key) ?? initialState;

  const [state, set] = useState<T>(storedValue);

  const hasMultipleValues = state && typeof state === 'object';

  const { initOnload = false } = options ?? {};

  useEffect(() => {
    if (storedValue) {
      if (hasMultipleValues) {
        set((prevValue) => ({ ...prevValue, ...storedValue }));
      } else {
        set(storedValue);
      }

      if (initOnload) {
        setStorage<T>(key, hasMultipleValues ? { ...storedValue } : storedValue);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initOnload, key, hasMultipleValues]);

  const updateState = useCallback(
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

  const updateField = useCallback(
    (name: keyof T, updateValue: T[keyof T]) => {
      if (hasMultipleValues) {
        updateState({ [name]: updateValue } as Partial<T>);
      }
    },
    [hasMultipleValues, updateState]
  );

  const resetState = useCallback(() => {
    set(initialState as T);
    removeStorage(key);
  }, [initialState, key]);

  const memoizedValue = useMemo(
    () => ({
      state,
      updateState,
      updateField,
      resetState,
    }),
    [resetState, updateField, updateState, state]
  );

  return memoizedValue;
}
