import { act, renderHook } from '@testing-library/react';

import { useLocalStorage } from './use-local-storage';
import { highlightText } from '../../../tests/highlight-text';
import { setStorage, getStorage, removeStorage } from '../../utils/local-storage';

// ----------------------------------------------------------------------

const testCases = [
  {
    key: 'objectKey',
    initialState: { name: 'John', age: 30 },
    newState: { name: 'Doe', age: 40 },
    storedValue: { name: 'Jane', age: 25 },
    type: 'object',
  },
  {
    key: 'stringKey',
    initialState: 'initialStringState',
    newState: 'newValue',
    storedValue: 'storedValue',
    type: 'string',
  },
  {
    key: 'numberKey',
    initialState: 42,
    newState: 99,
    storedValue: 100,
    type: 'number',
  },
  {
    key: 'nullKey',
    initialState: null,
    newState: 'newValue',
    storedValue: null,
    type: 'null',
  },
  {
    key: 'undefinedKey',
    initialState: undefined,
    newState: 'newValue',
    storedValue: undefined,
    type: 'undefined',
  },
];

vi.mock('../../utils/local-storage', () => ({
  setStorage: vi.fn(),
  getStorage: vi.fn(),
  removeStorage: vi.fn(),
}));

describe('useLocalStorage()', () => {
  beforeEach(() => {
    (getStorage as ReturnType<typeof vi.fn>).mockReturnValue(undefined);
    (setStorage as ReturnType<typeof vi.fn>).mockClear();
    (removeStorage as ReturnType<typeof vi.fn>).mockClear();
  });

  testCases.forEach(({ key, type, initialState, newState, storedValue }) => {
    describe(`with ${highlightText.val(type)} initial state`, () => {
      it(`1. Should initialize with the initial state`, () => {
        const { result } = renderHook(() => useLocalStorage(key, initialState));
        expect(result.current.state).toEqual(initialState);
      });

      it(`2. Should initialize with the stored value if available`, () => {
        (getStorage as ReturnType<typeof vi.fn>).mockReturnValue(storedValue);

        const { result } = renderHook(() => useLocalStorage(key, initialState));

        expect(result.current.state).toEqual(storedValue);
      });

      it(`3. Should update the state and save it to local storage`, () => {
        const { result } = renderHook(() => useLocalStorage(key, initialState));

        act(() => {
          result.current.setState(newState);
        });

        expect(result.current.state).toEqual(newState);
        expect(setStorage).toHaveBeenCalledWith(key, newState);
      });

      it(`4. Should reset the state to the initial value and remove it from local storage`, () => {
        const { result } = renderHook(() => useLocalStorage(key, initialState));

        act(() => {
          result.current.resetState(initialState);
        });

        expect(result.current.state).toEqual(initialState);
        expect(removeStorage).toHaveBeenCalledWith(key);
      });
    });
  });
});
