import type { Dispatch, SetStateAction, SyntheticEvent } from 'react';

import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * A custom React hook to manage the state of a tab component.
 *
 * @template T - The type of the tab value (e.g., string, number, or custom type).
 * @param defaultValue - The initial tab value or `false` to indicate no tab is selected. Defaults to `false`.
 * @returns An object containing the current tab state and methods to manipulate it.
 *
 * @remarks
 * - Use `false` as the tab value to deselect all tabs.
 * - The `onChange` handler is designed to work with tab components like Material-UI's `Tabs`.
 * - The hook is memoized for performance and supports dynamic default values.
 *
 * @example
 * ```tsx
 * // Example: Using string tab values
 * const { value, onChange, setValue, reset } = useTabs<'tab1' | 'tab2'>('tab1');
 *
 * return (
 *   <Tabs value={value} onChange={onChange}>
 *     <Tab label="Tab 1" value="tab1" />
 *     <Tab label="Tab 2" value="tab2" />
 *   </Tabs>
 * );
 *
 * // Manually select a tab
 * setValue('tab2');
 *
 * // Deselect all tabs
 * setValue(false);
 *
 * // Reset to default value
 * reset();
 * ```
 *
 * @example
 * ```tsx
 * // Example: Using number tab values with no initial selection
 * const { value, onChange } = useTabs<1 | 2>(false);
 *
 * return (
 *   <Tabs value={value} onChange={onChange}>
 *     <Tab label="Tab 1" value={1} />
 *     <Tab label="Tab 2" value={2} />
 *   </Tabs>
 * );
 * ```
 */

export type UseTabsReturn<T> = {
  value: T | false;
  setValue: Dispatch<SetStateAction<T | false>>;
  onChange: (event: SyntheticEvent, newValue: T | false) => void;
  reset: () => void;
};

export function useTabs<T>(defaultValue: T | false = false): UseTabsReturn<T> {
  const [value, setValue] = useState<T | false>(defaultValue);

  const onChange = useCallback((event: SyntheticEvent, newValue: T | false) => {
    setValue(newValue);
  }, []);

  const reset = useCallback(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return {
    value,
    setValue,
    onChange,
    reset,
  };
}
