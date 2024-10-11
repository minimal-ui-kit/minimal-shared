import type { Dispatch, SetStateAction } from 'react';

import { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to create a countdown timer in seconds.
 *
 * @param {number} defaultValue - The initial countdown value in seconds.
 *
 * @returns {UseCountdownSecondsReturn} - An object containing:
 * - `value`: The current countdown value in seconds.
 * - `start`: A function to start the countdown.
 * - `reset`: A function to reset the countdown to the initial value.
 * - `isCounting`: A boolean indicating whether the countdown is currently active.
 * - `setValue`: A function to manually set the countdown value.
 *
 * @example
 * const { value, start, reset, isCounting } = useCountdownSeconds(30);
 *
 * return (
 *   <div>
 *     <p>Countdown: {value} seconds</p>
 *     <button onClick={start} disabled={isCounting}>Start</button>
 *     <button onClick={reset}>Reset</button>
 *   </div>
 * );
 */

export type UseCountdownSecondsReturn = {
  value: number;
  start: () => void;
  reset: () => void;
  isCounting: boolean;
  setValue: Dispatch<SetStateAction<number>>;
};

export function useCountdownSeconds(defaultValue: number): UseCountdownSecondsReturn {
  const [value, setValue] = useState(defaultValue);
  const [isCounting, setIsCounting] = useState(false);

  const handleStart = useCallback(() => {
    setIsCounting(true);
  }, []);

  const handleReset = useCallback(() => {
    setIsCounting(false);
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isCounting && value > 0) {
      interval = setInterval(() => {
        setValue((prevValue) => prevValue - 1);
      }, 1000);
    } else if (value <= 0) {
      setIsCounting(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isCounting, value]);

  return {
    value,
    setValue,
    isCounting,
    start: handleStart,
    reset: handleReset,
  };
}
