import { act, renderHook } from '@testing-library/react';

import { useTextInput } from './use-text-input';

// ----------------------------------------------------------------------

describe('useTextInput()', () => {
  it(`1. Should initialize with default value`, () => {
    const { result } = renderHook(() => useTextInput('initial'));

    expect(result.current.value).toBe('initial');
  });

  it(`2. Should update value on change`, () => {
    const { result } = renderHook(() => useTextInput('initial'));

    act(() => {
      result.current.onChange({
        target: { value: 'new value' },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.value).toBe('new value');
  });

  it(`3. Should allow manual value setting`, () => {
    const { result } = renderHook(() => useTextInput('initial'));

    act(() => {
      result.current.setValue('manually set value');
    });

    expect(result.current.value).toBe('manually set value');
  });
});
