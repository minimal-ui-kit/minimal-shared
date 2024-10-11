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
  initialState?: T,
  options?: {
    daysUntilExpiration?: number;
  }
): UseCookiesReturn<T> {
  const storedValue: T = getCookie(key) ?? initialState;

  const [state, set] = useState(storedValue);

  const hasMultipleValues = state && typeof state === 'object';

  useEffect(() => {
    if (storedValue) {
      if (hasMultipleValues) {
        set((prevValue) => ({ ...prevValue, ...storedValue }));
      } else {
        set(storedValue);
      }
    }

    setCookie<T>(key, hasMultipleValues ? { ...storedValue } : storedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, hasMultipleValues]);

  const setState = useCallback(
    (updateState: T | Partial<T>) => {
      if (hasMultipleValues) {
        set((prevValue) => {
          const updatedState = { ...prevValue, ...updateState } as T;
          setCookie<T>(key, updatedState, options?.daysUntilExpiration);
          return updatedState;
        });
      } else {
        setCookie<T>(key, updateState as T, options?.daysUntilExpiration);
        set(updateState as T);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const resetState = useCallback(() => {
    removeCookie(key);
  }, [key]);

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
