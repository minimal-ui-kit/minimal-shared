import { act } from '@testing-library/react';

// ----------------------------------------------------------------------

export const setScrollY = (value: number) => {
  act(() => {
    window.scrollY = value;
    window.dispatchEvent(new Event('scroll'));
  });
};
