import { act, renderHook } from '@testing-library/react';

import { useScrollOffsetTop } from './use-scroll-offset-top';
import { highlightText } from '../../../tests/highlight-text';

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

  it(`1. Should return offsetTop as ${highlightText.val('false')} when window.scrollY is less than default value`, () => {
    const { result } = renderHook(() => useScrollOffsetTop(defaultOffset));
    expect(result.current.offsetTop).toBe(false);
  });

  it(`2. Should update offsetTop to ${highlightText.val('true')} when scroll position is greater than default value`, () => {
    const { result } = renderHook(() => useScrollOffsetTop(defaultOffset));
    setScrollY(defaultOffset + 10);
    expect(result.current.offsetTop).toBe(true);
  });

  it(`3. Should track element ${highlightText.val('ref')} offset if provided`, () => {
    const elementOffsetTop = 1000;

    const mockElement = document.createElement('div');

    Object.defineProperty(mockElement, 'offsetTop', { value: elementOffsetTop, writable: false });

    const { result } = renderHook(() => useScrollOffsetTop(0));

    act(() => {
      result.current.elementRef.current = mockElement;
    });

    setScrollY(elementOffsetTop - 1);
    expect(result.current.offsetTop).toBe(false);

    setScrollY(elementOffsetTop + 1);
    expect(result.current.offsetTop).toBe(true);
  });

  it(`4. Should update offsetTop to ${highlightText.val('false')} when scroll position is less than default value`, () => {
    const { result } = renderHook(() => useScrollOffsetTop(defaultOffset));
    setScrollY(defaultOffset - 1);
    expect(result.current.offsetTop).toBe(false);
  });
});
