import type { MouseEvent } from 'react';

import { act, renderHook } from '@testing-library/react';

import { useDoubleClick } from './use-double-click';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

describe('useDoubleClick()', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it(`1. Should call ${highlightText.fn('single')} click function`, () => {
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ click, doubleClick }));

    act(() => {
      result.current({ detail: 1 } as MouseEvent<HTMLElement>);
    });

    act(() => {
      vi.advanceTimersByTime(300); // Ensure the timeout has passed
    });

    expect(click).toHaveBeenCalledTimes(1);
    expect(doubleClick).not.toHaveBeenCalled();
  });

  it(`2. Should call ${highlightText.fn('double')} click function`, () => {
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ click, doubleClick }));

    act(() => {
      result.current({ detail: 2 } as MouseEvent<HTMLElement>);
    });

    expect(click).not.toHaveBeenCalled();
    expect(doubleClick).toHaveBeenCalledTimes(1);
  });

  it(`3. Should not call ${highlightText.fn('single')} click function if ${highlightText.fn('double')} click occurs within timeout`, () => {
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ click, doubleClick, timeout: 250 }));

    act(() => {
      result.current({ detail: 1 } as MouseEvent<HTMLElement>);
    });

    act(() => {
      vi.advanceTimersByTime(100);
    });

    act(() => {
      result.current({ detail: 2 } as MouseEvent<HTMLElement>);
    });

    act(() => {
      vi.advanceTimersByTime(150); // Ensure the timeout has passed
    });

    expect(click).not.toHaveBeenCalled();
    expect(doubleClick).toHaveBeenCalledTimes(1);
  });

  it(`4. Should call ${highlightText.fn('single')} click function if ${highlightText.fn('double')} click does not occur within timeout`, () => {
    const click = vi.fn();
    const doubleClick = vi.fn();
    const { result } = renderHook(() => useDoubleClick({ click, doubleClick, timeout: 250 }));

    act(() => {
      result.current({ detail: 1 } as MouseEvent<HTMLElement>);
    });

    act(() => {
      vi.advanceTimersByTime(300); // Ensure the timeout has passed
    });

    expect(click).toHaveBeenCalledTimes(1);
    expect(doubleClick).not.toHaveBeenCalled();
  });
});
