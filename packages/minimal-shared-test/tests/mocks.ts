import { act } from '@testing-library/react';

// ----------------------------------------------------------------------

export const setScrollY = (value: number) => {
  act(() => {
    window.scrollY = value;
    window.dispatchEvent(new Event('scroll'));
  });
};

export const mockLocalStorage = (implementation: Partial<Storage>) => {
  const original = window.localStorage;
  Object.defineProperty(window, 'localStorage', {
    value: implementation,
    configurable: true,
  });
  return () => Object.defineProperty(window, 'localStorage', { value: original });
};
