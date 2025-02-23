import type { SyntheticEvent } from 'react';

import { act, renderHook } from '@testing-library/react';

import { useTabs } from './use-tabs';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

describe('useTabs', () => {
  it(`1. Should initialize with the default value`, () => {
    const { result } = renderHook(() => useTabs('tab1'));
    expect(result.current.value).toBe('tab1');
  });

  it(`2. Should update the value when ${highlightText.fn('setValue')} is called`, () => {
    const { result } = renderHook(() => useTabs('tab1'));

    act(() => {
      result.current.setValue('tab2');
    });

    expect(result.current.value).toBe('tab2');
  });

  it(`3. Should update the value when ${highlightText.fn('onChange')} is called`, () => {
    const { result } = renderHook(() => useTabs('tab1'));

    act(() => {
      result.current.onChange({} as SyntheticEvent, 'tab2');
    });

    expect(result.current.value).toBe('tab2');
  });
});
