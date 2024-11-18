import { useMemo, useState, useEffect, useCallback } from 'react';

import { setCookie, getCookie, removeCookie } from '../../utils/cookies';

// ----------------------------------------------------------------------

/**
 * Custom hook to manage state with cookies.
 *
 * @param {string} key - The key for the cookie.
 * @param {T} initialState - The initial state value.
 * @param {Object} [options] - Optional settings.
 * @param {boolean} [options.initializeWithValue=true] - Whether to initialize the cookie with the initial state value.
 * @param {number} [options.daysUntilExpiration] - Number of days until the cookie expires.
 *
 * @returns {UseCookiesReturn<T>} - An object containing:
 * - `state`: The current state.
 * - `resetState`: A function to reset the state to the initial value and remove the cookie.
 * - `setState`: A function to update the state and save it to the cookie.
 * - `setField`: A function to update a specific field in the state and save it to the cookie.
 *
 * @example
 * const { state, setState, setField, resetState } = useCookies('user', { name: '', age: 0 });
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

export type UseCookiesOptions = {
  initializeWithValue?: boolean;
  daysUntilExpiration?: number;
};

export type UseCookiesReturn<T> = {
  state: T;
  resetState: (defaultState?: T) => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useCookies<T>(
  key: string,
  initialState?: T,
  options?: UseCookiesOptions
): UseCookiesReturn<T> {
  const { initializeWithValue = true, daysUntilExpiration } = options ?? {};
  const isObjectState = initialState && typeof initialState === 'object';

  const [state, setState] = useState<T | undefined>(initialState);

  useEffect(() => {
    const storedValue: T = getCookie(key);

    if (storedValue) {
      if (isObjectState) {
        setState((prevValue) => ({ ...prevValue, ...storedValue }));
      } else {
        setState(storedValue);
      }
    } else if (initialState && initializeWithValue) {
      setCookie<T>(key, initialState as T, daysUntilExpiration);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateState = useCallback(
    (newState: T | Partial<T>) => {
      if (isObjectState) {
        setState((prevValue) => {
          const updatedState = { ...prevValue, ...newState } as T;
          setCookie<T>(key, updatedState, daysUntilExpiration);
          return updatedState;
        });
      } else {
        setCookie<T>(key, newState as T, daysUntilExpiration);
        setState(newState as T);
      }
    },
    [isObjectState, key, daysUntilExpiration]
  );

  const updateField = useCallback(
    (fieldName: keyof T, updateValue: T[keyof T]) => {
      if (isObjectState) {
        updateState({ [fieldName]: updateValue } as Partial<T>);
      }
    },
    [isObjectState, updateState]
  );

  const resetState = useCallback(
    (defaultState?: T) => {
      setState(defaultState ?? initialState);
      removeCookie(key);
    },
    [initialState, key]
  );

  const memoizedValue = useMemo(
    () => ({
      state: state as T,
      setState: updateState,
      setField: updateField,
      resetState,
    }),
    [resetState, updateField, updateState, state]
  );

  return memoizedValue;
}
