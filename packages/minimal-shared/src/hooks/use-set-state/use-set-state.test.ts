import { act, renderHook } from '@testing-library/react';

import { useSetState } from './use-set-state';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

const defaultState = { name: '', age: 0 };

describe('useSetState()', () => {
  it(`1. Should initialize with the default state`, () => {
    const { result } = renderHook(() => useSetState(defaultState));

    expect(result.current.state).toEqual(defaultState);
  });

  it(`2. Should update the state when ${highlightText.fn('setState')} is called`, () => {
    const { result } = renderHook(() => useSetState(defaultState));

    act(() => {
      result.current.setState({ name: 'John' });
    });

    expect(result.current.state).toEqual({ name: 'John', age: 0 });

    act(() => {
      result.current.setState({ age: 30 });
    });

    expect(result.current.state).toEqual({ name: 'John', age: 30 });
  });

  it(`3. Should update a specific field when ${highlightText.fn('setField')} is called`, () => {
    const { result } = renderHook(() => useSetState(defaultState));

    act(() => {
      result.current.setField('name', 'John');
    });

    expect(result.current.state.name).toBe('John');
    expect(result.current.state.age).toBe(0);

    act(() => {
      result.current.setField('age', 30);
    });

    expect(result.current.state.name).toBe('John');
    expect(result.current.state.age).toBe(30);
  });

  it(`4. Should reset the state when ${highlightText.fn('onReset')} is called`, () => {
    const { result } = renderHook(() => useSetState(defaultState));

    act(() => {
      result.current.setState({ name: 'John', age: 30 });
    });
    expect(result.current.state).toEqual({ name: 'John', age: 30 });

    act(() => {
      result.current.resetState();
    });

    expect(result.current.state).toEqual(defaultState);
  });
});
