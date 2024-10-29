import type { Dispatch, SetStateAction } from 'react';

import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to manage text input state.
 *
 * @param {string} [defaultValue=''] - The default value for the input.
 * @returns {UseTextInputReturn} The current value, change handler, and setValue function.
 */

export type UseTextInputReturn = {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function useTextInput(defaultValue: string = ''): UseTextInputReturn {
  const [value, setValue] = useState(defaultValue);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }, []);

  return {
    value,
    setValue,
    onChange,
  };
}
