import { act, renderHook } from '@testing-library/react';

import { useBackToTop } from './use-back-to-top';
import { setScrollY } from '../../../tests/mocks';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

vi.useFakeTimers();

// Mock the necessary browser APIs
beforeAll(() => {
  vi.spyOn(window, 'addEventListener');
  vi.spyOn(window, 'removeEventListener');
});

const SCROLL_THRESHOLD_PERCENTAGE = '50%';
const SCROLL_THRESHOLD_PIXELS = 80;
const WINDOW_HEIGHT = 1000;
const BODY_HEIGHT = 2000;

describe('useBackToTop()', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    // Reset scroll properties for each test
    window.scrollY = 0;
    Object.defineProperty(window, 'innerHeight', { value: WINDOW_HEIGHT });
    Object.defineProperty(document.body, 'offsetHeight', { value: BODY_HEIGHT });
  });

  it(`1. Should initialize with the initial state`, () => {
    const { result } = renderHook(() => useBackToTop(SCROLL_THRESHOLD_PERCENTAGE));

    expect(result.current.isVisible).toBe(false);
  });

  it(`2. Should ${highlightText.val('show')} button when scroll position = ${SCROLL_THRESHOLD_PERCENTAGE} threshold (from top)`, () => {
    const { result } = renderHook(() => useBackToTop(SCROLL_THRESHOLD_PERCENTAGE));

    setScrollY(WINDOW_HEIGHT / 2); // 50%
    expect(result.current.isVisible).toBe(true);
  });

  it(`3. Should ${highlightText.val('show')} button when scroll position > ${SCROLL_THRESHOLD_PERCENTAGE} threshold (from top)`, () => {
    const { result } = renderHook(() => useBackToTop(SCROLL_THRESHOLD_PERCENTAGE));

    setScrollY(WINDOW_HEIGHT / 2 + 10); // 51%
    expect(result.current.isVisible).toBe(true);
  });

  it(`4. Should ${highlightText.val('hide')} button when scroll position < ${SCROLL_THRESHOLD_PERCENTAGE} threshold (from top)`, () => {
    const { result } = renderHook(() => useBackToTop(SCROLL_THRESHOLD_PERCENTAGE));

    setScrollY(WINDOW_HEIGHT / 2 - 10); // 49%
    expect(result.current.isVisible).toBe(false);
  });

  it(`5. Should ${highlightText.val('show')} button when scroll position = ${SCROLL_THRESHOLD_PIXELS}px threshold (from bottom)`, () => {
    const { result } = renderHook(() => useBackToTop(SCROLL_THRESHOLD_PIXELS));

    setScrollY(WINDOW_HEIGHT - SCROLL_THRESHOLD_PIXELS); // 80px
    expect(result.current.isVisible).toBe(true);
  });

  it(`6. Should ${highlightText.val('hide')} button when scroll position > ${SCROLL_THRESHOLD_PIXELS}px threshold (from bottom)`, () => {
    const { result } = renderHook(() => useBackToTop(SCROLL_THRESHOLD_PIXELS));

    setScrollY(WINDOW_HEIGHT - SCROLL_THRESHOLD_PIXELS - 1); // 81px
    expect(result.current.isVisible).toBe(false);
  });

  it(`7. Should ${highlightText.val('show')} button when scroll position < ${SCROLL_THRESHOLD_PIXELS}px threshold (from bottom)`, () => {
    const { result } = renderHook(() => useBackToTop(SCROLL_THRESHOLD_PIXELS));

    setScrollY(WINDOW_HEIGHT - SCROLL_THRESHOLD_PIXELS + 1); // 79px
    expect(result.current.isVisible).toBe(true);
  });

  it(`1. Should debounce scroll events when ${highlightText.val('isDebounce')} is true`, async () => {
    const { result } = renderHook(() => useBackToTop(SCROLL_THRESHOLD_PERCENTAGE, true));

    setScrollY(WINDOW_HEIGHT / 2 + 10); // 51%
    act(() => vi.advanceTimersByTime(100));
    expect(result.current.isVisible).toBe(true);
  });
});
