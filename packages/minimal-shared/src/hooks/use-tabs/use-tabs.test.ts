import type { SyntheticEvent } from 'react';

import { act, renderHook } from '@testing-library/react';

import { useTabs } from './use-tabs';

// ----------------------------------------------------------------------

describe('useTabs', () => {
  it(`1. Should initialize with the default value`, () => {
    const { result } = renderHook(() => useTabs('tab1'));
    expect(result.current.value).toBe('tab1');
  });

  it(`2. Should initialize with false when no tab is selected by default`, () => {
    const { result } = renderHook(() => useTabs(false));
    expect(result.current.value).toBe(false);
  });

  it(`3. Should update the value when setValue is called`, () => {
    const { result } = renderHook(() => useTabs('tab1'));

    act(() => {
      result.current.setValue('tab2');
    });

    expect(result.current.value).toBe('tab2');
  });

  it(`4. Should update the value when onChange is called with a new value`, () => {
    const { result } = renderHook(() => useTabs('tab1'));
    const mockEvent = { target: { value: 'tab2' } } as unknown as SyntheticEvent;

    act(() => {
      result.current.onChange(mockEvent, 'tab2');
    });

    expect(result.current.value).toBe('tab2');
  });

  it(`5. Should reset the value to the initial defaultValue`, () => {
    const { result } = renderHook(() => useTabs('tab1'));

    act(() => {
      result.current.setValue('tab2');
      result.current.reset();
    });

    expect(result.current.value).toBe('tab1');
  });

  it(`6. Should reset to false when initial defaultValue is false`, () => {
    const { result } = renderHook(() => useTabs<string>(false));

    act(() => {
      result.current.setValue('tab1');
      result.current.reset();
    });

    expect(result.current.value).toBe(false);
  });

  it(`7. Should initialize with the numeric default value when provided as a number`, () => {
    const { result } = renderHook(() => useTabs(1));
    expect(result.current.value).toBe(1);
  });

  it(`8. Should update the value when setValue is called with a number`, () => {
    const { result } = renderHook(() => useTabs(1));

    act(() => {
      result.current.setValue(2);
    });

    expect(result.current.value).toBe(2);
  });

  it(`9. Should update the value when onChange is called with a number`, () => {
    const { result } = renderHook(() => useTabs(1));
    const mockEvent = { target: { value: 2 } } as unknown as SyntheticEvent;

    act(() => {
      result.current.onChange(mockEvent, 2);
    });

    expect(result.current.value).toBe(2);
  });

  it(`10. Should reset the value to the initial numeric defaultValue`, () => {
    const { result } = renderHook(() => useTabs(1));

    act(() => {
      result.current.setValue(2);
      result.current.reset();
    });

    expect(result.current.value).toBe(1);
  });

  it(`11. Should handle multiple consecutive state changes correctly`, () => {
    const { result } = renderHook(() => useTabs('tab1'));

    act(() => {
      result.current.setValue('tab2');
      result.current.setValue('tab1');
      result.current.setValue('tab2');
    });

    expect(result.current.value).toBe('tab2');
  });
});
