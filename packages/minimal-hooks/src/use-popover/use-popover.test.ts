import type { MouseEvent } from 'react';

import { act, renderHook } from '@testing-library/react';

import { usePopover } from './use-popover';

// ----------------------------------------------------------------------

describe('usePopover', () => {
  const setup = () => renderHook(() => usePopover<HTMLButtonElement>());

  it('should initialize with closed popover', () => {
    const { result } = setup();
    expect(result.current.open).toBe(false);
    expect(result.current.anchorEl).toBe(null);
  });

  it('should open the popover on onOpen call', () => {
    const { result } = setup();

    act(() => {
      result.current.onOpen({
        currentTarget: document.createElement('button'),
      } as MouseEvent<HTMLButtonElement>);
    });

    expect(result.current.open).toBe(true);
    expect(result.current.anchorEl).not.toBe(null);
  });

  it('should close the popover on onClose call', () => {
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

  it('should set the popover open state manually', () => {
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
