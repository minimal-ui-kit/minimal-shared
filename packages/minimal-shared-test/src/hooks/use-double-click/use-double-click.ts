import type { MouseEvent, SyntheticEvent } from 'react';

import { useRef, useCallback } from 'react';

// ----------------------------------------------------------------------

/**
 * Custom hook to handle single and double click events on an element.
 *
 * @param {UseDoubleClickProps} props - The properties for the hook.
 * @param {number} [props.timeout=250] - The timeout in milliseconds to differentiate between single and double clicks.
 * @param {function} [props.click] - The function to call on a single click.
 * @param {function} props.doubleClick - The function to call on a double click.
 *
 * @returns {UseDoubleClickReturn} - A function to handle the click events.
 *
 * @example
 * const handleClick = (event) => console.log('Single Click', event);
 * const handleDoubleClick = (event) => console.log('Double Click', event);
 * const handleEvent = useDoubleClick({ click: handleClick, doubleClick: handleDoubleClick });
 *
 * return <div onClick={handleEvent}>Click Me</div>;
 */

export type UseDoubleClickReturn = (event: MouseEvent<HTMLElement>) => void;

type UseDoubleClickProps = {
  timeout?: number;
  click?: (event: SyntheticEvent) => void;
  doubleClick: (event: SyntheticEvent) => void;
};

export function useDoubleClick({
  click,
  doubleClick,
  timeout = 250,
}: UseDoubleClickProps): UseDoubleClickReturn {
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const clearClickTimeout = useCallback(() => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
      clickTimeout.current = null;
    }
  }, []);

  const handleEvent = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      clearClickTimeout();
      if (click && event.detail === 1) {
        clickTimeout.current = setTimeout(() => {
          click(event);
        }, timeout);
      }
      if (event.detail % 2 === 0) {
        doubleClick(event);
      }
    },
    [click, doubleClick, timeout, clearClickTimeout]
  );

  return handleEvent;
}
