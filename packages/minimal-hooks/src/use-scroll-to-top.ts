import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// ----------------------------------------------------------------------

/**
 * Custom hook to scroll the window to the top whenever the pathname changes.
 *
 * @returns {null} - This hook does not return any value.
 *
 * @example
 * useScrollToTop();
 */

export function useScrollToTop(): null {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
