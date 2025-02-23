import { act, renderHook } from '@testing-library/react';

import { highlightText } from '../../../tests/highlight-text';
import { useCountdownSeconds } from './use-countdown-seconds';

// ----------------------------------------------------------------------

describe('useCountdownSeconds()', () => {
  const defaultValue = 10;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const setup = (initialValue = defaultValue) =>
    renderHook(() => useCountdownSeconds(initialValue));

  it(`1. Should initialize with the default value`, () => {
    const { result } = setup();

    expect(result.current.value).toBe(defaultValue);
    expect(result.current.isCounting).toBe(false);
  });

  it(`2. Should ${highlightText.fn('start')} the countdown`, () => {
    const { result } = setup();

    act(() => {
      result.current.start();
    });

    expect(result.current.isCounting).toBe(true);

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.value).toBe(defaultValue - 1);
  });

  it(`3. Should ${highlightText.fn('reset')} the countdown`, () => {
    const { result } = setup();

    act(() => {
      result.current.start();
      vi.advanceTimersByTime(1000);
      result.current.reset();
    });

    expect(result.current.value).toBe(defaultValue);
    expect(result.current.isCounting).toBe(false);
  });

  it(`4. Should ${highlightText.fn('stop')} the countdown when value reaches zero`, () => {
    const { result } = setup();

    act(() => {
      result.current.start();
    });

    act(() => {
      vi.advanceTimersByTime(defaultValue * 1000);
    });

    expect(result.current.value).toBe(0);
    expect(result.current.isCounting).toBe(false);
  });

  it(`5. Should allow manual setting of the countdown value`, () => {
    const { result } = setup();

    act(() => {
      result.current.setValue(10);
    });

    expect(result.current.value).toBe(10);
  });
});
