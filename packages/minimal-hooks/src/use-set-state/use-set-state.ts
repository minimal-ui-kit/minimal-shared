import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to manage state with utility functions to set state, set a specific field, and reset state.
 *
 * @param {T} initialState - The initial state value.
 *
 * @returns {UseSetStateReturn<T>} - An object containing:
 * - `state`: The current state.
 * - `onReset`: A function to reset the state to the initial value.
 * - `setState`: A function to update the state.
 * - `setField`: A function to update a specific field in the state.
 *
 * @example
 * const { state, setState, setField, onReset } = useSetState({ name: '', age: 0 });
 *
 * return (
 *   <div>
 *     <p>Name: {state.name}</p>
 *     <p>Age: {state.age}</p>
 *     <button onClick={() => setField('name', 'John')}>Set Name</button>
 *     <button onClick={onReset}>Reset</button>
 *   </div>
 * );
 */

export type UseSetStateReturn<T> = {
  state: T;
  onReset: () => void;
  setState: (updateState: T | Partial<T>) => void;
  setField: (name: keyof T, updateValue: T[keyof T]) => void;
};

export function useSetState<T>(initialState: T): UseSetStateReturn<T> {
  const [state, set] = useState(initialState);

  const setState = useCallback((updateState: T | Partial<T>) => {
    set((prevValue) => ({ ...prevValue, ...updateState }));
  }, []);

  const setField = useCallback(
    (name: keyof T, updateValue: T[keyof T]) => {
      setState({ [name]: updateValue } as Partial<T>);
    },
    [setState]
  );

  const onReset = useCallback(() => {
    set(initialState);
  }, [initialState]);

  return {
    state,
    setState,
    setField,
    onReset,
  };
}
