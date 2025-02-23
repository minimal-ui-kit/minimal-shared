import type { RefObject } from 'react';

import { act, renderHook } from '@testing-library/react';

import { usePopoverHover } from './use-popover-hover';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

describe('usePopoverHover', () => {
  const setup = (ref?: RefObject<HTMLButtonElement>) =>
    renderHook(() => usePopoverHover<HTMLButtonElement>(ref));

  it(`1. Should initialize with closed popover`, () => {
    const { result } = setup();

    expect(result.current.open).toBe(false);
    expect(result.current.anchorEl).toBe(null);
  });

  it(`2. Should open the popover on ${highlightText.fn('onOpen')} call`, () => {
    const { result } = setup();

    act(() => {
      result.current.onOpen();
    });

    expect(result.current.open).toBe(true);
  });

  it(`3. Should close the popover on ${highlightText.fn('onClose')} call`, () => {
    const { result } = setup();

    act(() => {
      result.current.onOpen();
    });

    act(() => {
      result.current.onClose();
    });

    expect(result.current.open).toBe(false);
  });

  it(`4. Should set the popover ${highlightText.val('open')} state manually`, () => {
    const { result } = setup();

    act(() => {
      result.current.setOpen(true);
    });

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.setOpen(false);
    });

    expect(result.current.open).toBe(false);
  });

  it(`5. Should use the provided ${highlightText.val('ref')} if inputRef is passed`, () => {
    const ref = { current: document.createElement('button') };
    const { result } = setup(ref);

    expect(result.current.elementRef).toBe(ref);
    expect(result.current.anchorEl).toBe(ref.current);
  });
});
