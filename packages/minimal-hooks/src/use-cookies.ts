import { useMemo, useState, useEffect, useCallback } from 'react';

import { getCookie, setCookie, removeCookie } from '@minimals/utils/cookies';

// ----------------------------------------------------------------------

/**
 * Custom hook to manage state with cookies.
 *
 * @param {string} key - The key for the cookie.
 * @param {T} initialState - The initial state value.
 * @param {T} defaultValues - The default values to reset to.
 * @param {Object} [options] - Optional settings.
 * @param {number} [options.daysUntilExpiration] - Number of days until the cookie expires.
 *
 * @returns {UseCookiesReturn<T>} - An object containing:
 * - `state`: The current state.
 * - `resetState`: A function to reset the state to default values.
 * - `setState`: A function to update the state.
 * - `setField`: A function to update a specific field in the state.
 *
 * @example
 * const { state, setState, setField, resetState } = useCookies('user', { name: '', age: 0 }, { name: '', age: 0 });
 *
 * return (
 *   <div>
 *     <p>Name: {state.name}</p>
 *     <p>Age: {state.age}</p>
 *     <button onClick={() => setField('name', 'John')}>Set Name</button>
 *     <button onClick={resetState}>Reset</button>
 *   </div>
 * );
 */

export type UseCookiesReturn<T> = {
  state: T;
  resetState: () => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useCookies<T>(
  key: string,
  initialState: T,
  defaultValues: T,
  options?: {
    daysUntilExpiration?: number;
  }
): UseCookiesReturn<T> {
  const [state, set] = useState(initialState);

  const multiValue = initialState && typeof initialState === 'object';

  useEffect(() => {
    const restoredValue: T = getCookie(key);

    if (restoredValue) {
      if (multiValue) {
        set((prevValue) => ({ ...prevValue, ...restoredValue }));
      } else {
        set(restoredValue);
      }
    }
  }, [key, multiValue]);

  const setState = useCallback(
    (updateState: T | Partial<T>) => {
      if (multiValue) {
        set((prevValue) => {
          setCookie<T>(key, { ...prevValue, ...updateState }, options?.daysUntilExpiration);
          return { ...prevValue, ...updateState };
        });
      } else {
        setCookie<T>(key, updateState as T, options?.daysUntilExpiration);
        set(updateState as T);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const resetState = useCallback(() => {
    removeCookie(key);
    set(defaultValues);
  }, [defaultValues, key]);

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
