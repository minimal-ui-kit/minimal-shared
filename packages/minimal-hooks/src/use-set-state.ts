import { useMemo, useState, useCallback } from 'react';

// ----------------------------------------------------------------------

export type UseSetStateReturn<T> = {
  state: T;

  onResetState: () => void;
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

  const onResetState = useCallback(() => {
    set(initialState);
  }, [initialState]);

  const memoizedValue = useMemo(
    () => ({
      state,
      setState,
      setField,
      onResetState,
    }),
    [onResetState, setField, setState, state]
  );

  return memoizedValue;
}
