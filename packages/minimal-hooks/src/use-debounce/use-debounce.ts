import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to debounce a value. The debounced value will only update after the specified delay has passed without any changes.
 *
 * @param {string} value - The value to debounce.
 * @param {number} [delay=1000] - The delay in milliseconds to wait before updating the debounced value.
 *
 * @returns {UseDebounceReturn} - The debounced value.
 *
 * @example
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search
 *   }
 * }, [debouncedSearchTerm]);
 */

export type UseDebounceReturn = string;

export function useDebounce(value: string, delay: number = 1000): UseDebounceReturn {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
