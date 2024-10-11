import { renderHook } from '@testing-library/react';

import { useCountdownDate } from './use-countdown-date';

// ----------------------------------------------------------------------

describe('useCountdownDate()', () => {
  const targetDate = new Date('2025-12-31T23:59:59');

  it(`Should initialize with values`, () => {
    const { result } = renderHook(() => useCountdownDate(targetDate));

    expect(typeof parseInt(result.current.days)).toBe('number');
    expect(typeof parseInt(result.current.hours)).toBe('number');
    expect(typeof parseInt(result.current.minutes)).toBe('number');
    expect(typeof parseInt(result.current.seconds)).toBe('number');
  });
});
