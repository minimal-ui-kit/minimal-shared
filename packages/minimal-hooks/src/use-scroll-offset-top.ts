import { useRef, useMemo, useState, useCallback, useLayoutEffect } from 'react';

// ----------------------------------------------------------------------

export type UseScrollOffsetTopReturn = {
  offsetTop: boolean;
  elementRef: React.RefObject<HTMLDivElement>;
};

export function useScrollOffsetTop(defaultValue: number = 0): UseScrollOffsetTopReturn {
  const elementRef = useRef<HTMLDivElement>(null);
  const [offsetTop, setOffsetTop] = useState(false);

  console.log('offsetTop', offsetTop);

  const handleScroll = useCallback(() => {
    const windowScrollY = window.scrollY;

    if (elementRef.current) {
      const elementOffsetTop = elementRef.current.offsetTop;
      setOffsetTop(windowScrollY > elementOffsetTop - defaultValue);
    } else {
      setOffsetTop(windowScrollY > defaultValue * 2);
    }
  }, [defaultValue]);

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const memoizedValue = useMemo(() => ({ elementRef, offsetTop }), [offsetTop]);

  return memoizedValue;
}

/*
 * 1: Applies to top <header/>
 * const { offsetTop } = useScrollOffsetTop(80);
 *
 * Or
 *
 * 2: Applies to element
 * const { offsetTop, elementRef } = useScrollOffsetTop(80);
 * <div ref={elementRef} />
 *
 */
