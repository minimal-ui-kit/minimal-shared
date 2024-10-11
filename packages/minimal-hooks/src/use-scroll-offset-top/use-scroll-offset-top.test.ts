import type { MutableRefObject } from 'react';

import { act, renderHook } from '@testing-library/react';

import { useScrollOffsetTop } from './use-scroll-offset-top';

// ----------------------------------------------------------------------

const defaultOffset = 100;

describe('useScrollOffsetTop()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.stubGlobal('scrollY', 0);
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.resetAllMocks();
  });

  const setScrollY = (value: number) => {
    act(() => {
      window.scrollY = value;
      window.dispatchEvent(new Event('scroll'));
    });
  };

  it('should return offsetTop as false when window.scrollY is less than default value', () => {
    const { result } = renderHook(() => useScrollOffsetTop<HTMLDivElement>(defaultOffset));
    expect(result.current.offsetTop).toBe(false);
  });

  it('should update offsetTop to true when scroll position is greater than default value', () => {
    const { result } = renderHook(() => useScrollOffsetTop<HTMLDivElement>(defaultOffset));
    setScrollY(defaultOffset + 10);
    expect(result.current.offsetTop).toBe(true);
  });

  it('should track element ref offset if provided', () => {
    const elementOffsetTop = 1000;

    const mockElement = document.createElement('div');

    Object.defineProperty(mockElement, 'offsetTop', { value: elementOffsetTop, writable: false });

    const { result } = renderHook(() => useScrollOffsetTop<HTMLDivElement>(0));

    act(() => {
      (result.current.elementRef as MutableRefObject<HTMLDivElement>).current = mockElement;
    });

    setScrollY(elementOffsetTop - 1);
    expect(result.current.offsetTop).toBe(false);

    setScrollY(elementOffsetTop + 1);
    expect(result.current.offsetTop).toBe(true);
  });

  it('should update offsetTop to false when scroll position is less than default value', () => {
    const { result } = renderHook(() => useScrollOffsetTop<HTMLDivElement>(defaultOffset));
    setScrollY(defaultOffset - 1);
    expect(result.current.offsetTop).toBe(false);
  });
});
