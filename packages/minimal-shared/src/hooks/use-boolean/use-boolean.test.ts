import { act, renderHook } from '@testing-library/react';

import { useBoolean } from './use-boolean';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

describe('useBoolean()', () => {
  const setup = (initialValue?: boolean) => renderHook(() => useBoolean(initialValue));

  it(`1. Should initialize with the default value`, () => {
    const { result } = setup();
    expect(result.current.value).toBe(false);
  });

  it(`2. Should initialize with the provided value`, () => {
    const { result } = setup(true);
    expect(result.current.value).toBe(true);
  });

  it(`3. Should set value to ${highlightText.val('true')} when ${highlightText.fn('onTrue')} is called`, () => {
    const { result } = renderHook(() => useBoolean(false));

    act(() => {
      result.current.onTrue();
    });

    expect(result.current.value).toBe(true);
  });

  it(`4. Should set value to ${highlightText.val('false')} when ${highlightText.fn('onFalse')} is called`, () => {
    const { result } = setup(true);

    act(() => {
      result.current.onFalse();
    });

    expect(result.current.value).toBe(false);
  });

  it(`5. Should toggle value when ${highlightText.fn('onToggle')} is called`, () => {
    const { result } = setup(false);

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.onToggle();
    });

    expect(result.current.value).toBe(false);
  });

  it(`6. Should allow manual setting of value`, () => {
    const { result } = setup(false);

    act(() => {
      result.current.setValue(true);
    });

    expect(result.current.value).toBe(true);

    act(() => {
      result.current.setValue(false);
    });

    expect(result.current.value).toBe(false);
  });
});
