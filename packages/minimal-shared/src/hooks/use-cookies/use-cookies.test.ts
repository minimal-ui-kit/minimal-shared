import { act, renderHook } from '@testing-library/react';

import { useCookies } from './use-cookies';
import { setCookie, getCookie, removeCookie } from '../../utils/cookies';

// ----------------------------------------------------------------------

vi.mock('../../utils/cookies', () => ({
  getCookie: vi.fn(),
  setCookie: vi.fn(),
  removeCookie: vi.fn(),
}));

describe('useCookies()', () => {
  const key = 'testKey';
  const initialState = { name: 'John', age: 30 };
  const updatedState = { name: 'Doe', age: 25 };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it(`1. Should initialize state with cookie value if available`, () => {
    (getCookie as ReturnType<typeof vi.fn>).mockReturnValue(initialState);
    const { result } = renderHook(() => useCookies(key, initialState));

    expect(result.current.state).toEqual(initialState);
    expect(getCookie).toHaveBeenCalledWith(key);
  });

  it(`2. Should initialize state with initial state if cookie is not available`, () => {
    (getCookie as ReturnType<typeof vi.fn>).mockReturnValue(undefined);
    const { result } = renderHook(() => useCookies(key, initialState));

    expect(result.current.state).toEqual(initialState);
    expect(getCookie).toHaveBeenCalledWith(key);
  });

  it(`3. Should update state and set cookie when setState is called`, () => {
    (getCookie as ReturnType<typeof vi.fn>).mockReturnValue(initialState);
    const { result } = renderHook(() => useCookies(key, initialState));

    act(() => result.current.setState(updatedState));

    expect(result.current.state).toEqual(updatedState);
    expect(setCookie).toHaveBeenCalledWith(key, updatedState, {});
  });

  it(`4. Should update specific field and set cookie when setField is called`, () => {
    (getCookie as ReturnType<typeof vi.fn>).mockReturnValue(initialState);
    const { result } = renderHook(() => useCookies(key, initialState));

    act(() => result.current.setField('name', 'Jane'));

    expect(result.current.state).toEqual({ ...initialState, name: 'Jane' });
    expect(setCookie).toHaveBeenCalledWith(key, { ...initialState, name: 'Jane' }, {});
  });

  it(`5. Should remove cookie when resetState is called`, () => {
    (getCookie as ReturnType<typeof vi.fn>).mockReturnValue(initialState);
    const { result } = renderHook(() => useCookies(key, initialState));

    act(() => result.current.resetState(initialState));

    expect(removeCookie).toHaveBeenCalledWith(key);
  });

  it(`6. Should initialize state with cookie value if available when only key is provided`, () => {
    (getCookie as ReturnType<typeof vi.fn>).mockReturnValue(initialState);
    const { result } = renderHook(() => useCookies(key));

    expect(result.current.state).toEqual(initialState);
    expect(getCookie).toHaveBeenCalledWith(key);
  });

  it(`7. Should initialize state with undefined if cookie is not available when only key is provided`, () => {
    (getCookie as ReturnType<typeof vi.fn>).mockReturnValue(undefined);
    const { result } = renderHook(() => useCookies(key));
    expect(result.current.state).toBe(undefined);
    expect(getCookie).toHaveBeenCalledWith(key);
  });
});
