import type { MouseEvent } from 'react';

import { act, renderHook } from '@testing-library/react';

import { usePopover } from './use-popover';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

describe('usePopover()', () => {
  const setup = () => renderHook(() => usePopover<HTMLButtonElement>());

  it(`1. Should initialize with ${highlightText.val('closed')} popover`, () => {
    const { result } = setup();
    expect(result.current.open).toBe(false);
    expect(result.current.anchorEl).toBe(null);
  });

  it(`2. Should open the popover on ${highlightText.val('onOpen')} call`, () => {
    const { result } = setup();

    act(() => {
      result.current.onOpen({
        currentTarget: document.createElement('button'),
      } as MouseEvent<HTMLButtonElement>);
    });

    expect(result.current.open).toBe(true);
    expect(result.current.anchorEl).not.toBe(null);
  });

  it(`3. Should close the popover on ${highlightText.val('onClose')} call`, () => {
    const { result } = setup();

    act(() => {
      result.current.onOpen({
        currentTarget: document.createElement('button'),
      } as MouseEvent<HTMLButtonElement>);
    });

    act(() => {
      result.current.onClose();
    });

    expect(result.current.open).toBe(false);
    expect(result.current.anchorEl).toBe(null);
  });

  it(`4. Should set the popover ${highlightText.val('open')} state manually`, () => {
    const { result } = setup();

    act(() => {
      result.current.setAnchorEl(document.createElement('button'));
    });

    expect(result.current.open).toBe(true);

    act(() => {
      result.current.setAnchorEl(null);
    });

    expect(result.current.open).toBe(false);
  });
});
