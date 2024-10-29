import { useMemo, useState, useEffect, useCallback } from 'react';

import { setCookie, getCookie, removeCookie } from '../../utils/cookies';

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
  resetState: (defaultState?: T) => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useCookies<T>(
  key: string,
  initialState?: T,
  options?: {
    initOnLoad?: boolean;
    daysUntilExpiration?: number;
  }
): UseCookiesReturn<T> {
  const isValuePresent = !!getCookie(key);
  const storedValue: T = getCookie(key) ?? initialState;

  const [state, set] = useState(storedValue);

  const { initOnLoad = true, daysUntilExpiration } = options ?? {};
  const hasMultipleValues = state && typeof state === 'object';

  useEffect(() => {
    if (storedValue) {
      if (hasMultipleValues) {
        set((prevValue) => ({ ...prevValue, ...storedValue }));
      } else {
        set(storedValue);
      }

      if (!isValuePresent && initOnLoad) {
        setCookie<T>(key, storedValue, daysUntilExpiration);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setState = useCallback(
    (updateState: T | Partial<T>) => {
      if (hasMultipleValues) {
        set((prevValue) => {
          const updatedState = { ...prevValue, ...updateState } as T;

          setCookie<T>(key, updatedState, daysUntilExpiration);
          return updatedState;
        });
      } else {
        setCookie<T>(key, updateState as T, daysUntilExpiration);
        set(updateState as T);
      }
    },
    [hasMultipleValues, key, daysUntilExpiration]
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
      removeCookie(key);
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
