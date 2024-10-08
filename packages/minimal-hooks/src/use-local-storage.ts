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
 * - `onReset`: A function to reset the state to the initial value and remove it from local storage.
 * - `setState`: A function to update the state and save it to local storage.
 * - `setField`: A function to update a specific field in the state and save it to local storage.
 *
 * @example
 * const { state, onReset, setState, setField } = useLocalStorage('settings', initialState);
 *
 * return (
 *   <div>
 *     <p>State: {JSON.stringify(state)}</p>
 *     <button onClick={() => setField('name', 'John')}>Set Name</button>
 *     <button onClick={onReset}>Reset</button>
 *   </div>
 * );
 */

export type UseLocalStorageReturn<T> = {
  state: T;
  onReset: () => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useLocalStorage<T>(
  key: string,
  initialState: T,
  options?: {
    initOnload?: boolean;
  }
): UseLocalStorageReturn<T> {
  const [state, set] = useState(initialState);

  const multiValue = initialState && typeof initialState === 'object';

  const { initOnload = false } = options || {};

  useEffect(() => {
    const restoredValue: T = getStorage(key) ?? initialState;

    if (restoredValue) {
      if (multiValue) {
        set((prevValue) => ({ ...prevValue, ...restoredValue }));
      } else {
        set(restoredValue);
      }

      if (initOnload) {
        setStorage<T>(key, multiValue ? { ...restoredValue } : restoredValue);
      }
    }
  }, [initOnload, initialState, key, multiValue]);

  const setState = useCallback(
    (updateState: T | Partial<T>) => {
      if (multiValue) {
        set((prevValue) => {
          setStorage<T>(key, { ...prevValue, ...updateState });
          return { ...prevValue, ...updateState };
        });
      } else {
        setStorage<T>(key, updateState as T);
        set(updateState as T);
      }
    },
    [key, multiValue]
  );

  const setField = useCallback(
    (name: keyof T, updateValue: T[keyof T]) => {
      if (multiValue) {
        setState({ [name]: updateValue } as Partial<T>);
      }
    },
    [multiValue, setState]
  );

  const onReset = useCallback(() => {
    set(initialState);
    removeStorage(key);
  }, [initialState, key]);

  const memoizedValue = useMemo(
    () => ({
      state,
      setState,
      setField,
      onReset,
    }),
    [onReset, setField, setState, state]
  );

  return memoizedValue;
}

/**
 * @usage
 * const { state, onReset, setState, setField } = useLocalStorage<SettingsState>(
 *  storageKey,
 *  initialState
 * );
 */
