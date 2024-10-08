import { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to create a countdown timer to a target date.
 *
 * @param {Date} targetDate - The target date to count down to.
 * @param {string} [placeholder='- -'] - The placeholder value to display before the countdown starts.
 *
 * @returns {UseCountdownDateReturn} - An object containing the current countdown values in days, hours, minutes, and seconds.
 *
 * @example
 * const { days, hours, minutes, seconds } = useCountdownDate(new Date('2023-12-31T23:59:59'));
 *
 * return (
 *   <div>
 *     <p>Days: {days}</p>
 *     <p>Hours: {hours}</p>
 *     <p>Minutes: {minutes}</p>
 *     <p>Seconds: {seconds}</p>
 *   </div>
 * );
 */

export type UseCountdownDateReturn = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

export function useCountdownDate(targetDate: Date, placeholder = '- -'): UseCountdownDateReturn {
  const [value, setValue] = useState({
    days: placeholder,
    hours: placeholder,
    minutes: placeholder,
    seconds: placeholder,
  });

  const handleUpdate = useCallback(() => {
    const now = new Date();
    const { days, hours, minutes, seconds } = calculateTimeDifference(targetDate, now);

    setValue({
      days: formatTime(days),
      hours: formatTime(hours),
      minutes: formatTime(minutes),
      seconds: formatTime(seconds),
    });
  }, [targetDate]);

  useEffect(() => {
    handleUpdate();
    const interval = setInterval(handleUpdate, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return value;
}

// ----------------------------------------------------------------------

/**
 * Formats a time value to ensure it is always two digits.
 *
 * @param {number} value - The time value to format.
 * @returns {string} - The formatted time value.
 */

function formatTime(value: number): string {
  return String(value).length === 1 ? `0${value}` : `${value}`;
}

/**
 * Calculates the time difference between a future date and the current date.
 *
 * @param {Date} futureDate - The future date to count down to.
 * @param {Date} currentDate - The current date.
 * @returns {Object} - An object containing the time difference in days, hours, minutes, and seconds.
 */
function calculateTimeDifference(
  futureDate: Date,
  currentDate: Date
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const distance = futureDate.getTime() - currentDate.getTime();

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((distance % (1000 * 60)) / 1000),
  };
}
