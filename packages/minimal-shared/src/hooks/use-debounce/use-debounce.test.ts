import { act, renderHook } from '@testing-library/react';

import { useDebounce } from './use-debounce';

// ----------------------------------------------------------------------

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it(`1. Should initialize with the initial value`, () => {
    const { result } = renderHook(() => useDebounce('initial', 1000));
    expect(result.current).toBe('initial');
  });

  it(`2. Should update the debounced value after the delay`, () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 1000 },
    });

    rerender({ value: 'updated', delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('updated');
  });

  it(`3. Should reset the debounce timer if value changes within the delay`, () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 1000 },
    });

    rerender({ value: 'updated1', delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    rerender({ value: 'updated2', delay: 1000 });

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current).toBe('updated2');
  });

  it(`4. Should use the new delay if it changes`, () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 1000 },
    });

    rerender({ value: 'updated', delay: 500 });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('updated');
  });
});
