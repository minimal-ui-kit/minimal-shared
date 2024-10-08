import { useState, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to manage the state of a popover.
 *
 * @returns {UsePopoverReturn<T>} - An object containing:
 * - `open`: A boolean indicating whether the popover is open.
 * - `anchorEl`: The current element that the popover is anchored to.
 * - `onClose`: A function to close the popover.
 * - `onOpen`: A function to open the popover.
 * - `setAnchorEl`: A function to manually set the anchor element.
 *
 * @example
 * const { open, anchorEl, onOpen, onClose } = usePopover<HTMLButtonElement>();
 *
 * return (
 *   <>
 *     <button variant="contained" onClick={onOpen}>Click me</button>
 *
 *     <Popover open={open} onClose={onClose} anchorEl={anchorEl}>
 *        Popover content
 *      </Popover>
 *   </>
 * );
 */

export type UsePopoverReturn<T> = {
  open: boolean;
  anchorEl: T | null;
  onClose: () => void;
  onOpen: (event: React.MouseEvent<HTMLElement>) => void;
  setAnchorEl: React.Dispatch<React.SetStateAction<T | null>>;
};

export function usePopover<T extends HTMLElement>(): UsePopoverReturn<T> {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);

  const onOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget as T);
  }, []);

  const onClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    open: !!anchorEl,
    anchorEl,
    onOpen,
    onClose,
    setAnchorEl,
  };
}
