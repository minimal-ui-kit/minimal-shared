import { getCookie, setCookie, removeCookie } from './cookies';

let cookieStore: Record<string, string> = {};

// ----------------------------------------------------------------------

beforeEach(() => {
  cookieStore = {};

  vi.spyOn(document, 'cookie', 'get').mockImplementation(() =>
    Object.entries(cookieStore)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')
  );

  vi.spyOn(document, 'cookie', 'set').mockImplementation((cookieString) => {
    const [cookie] = cookieString.split(';');
    const [key, value] = cookie.split('=');
    if (value === '') {
      delete cookieStore[key];
    } else {
      cookieStore[key] = value;
    }
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('Cookie utility functions', () => {
  it(`1. Should set a cookie`, () => {
    setCookie('user', { name: 'John', age: 30 }, { daysUntilExpiration: 7 });
    const storedCookie = cookieStore['user'];

    expect(storedCookie).toBe(encodeURIComponent(JSON.stringify({ name: 'John', age: 30 })));
  });

  it(`2. Should retrieve a cookie`, () => {
    // Manually set a cookie for testing retrieval
    cookieStore['user'] = encodeURIComponent(JSON.stringify({ name: 'John', age: 30 }));

    const user = getCookie('user');
    expect(user).toEqual({ name: 'John', age: 30 });
  });

  it(`3. Should return null if the cookie does not exist`, () => {
    const nonExistent = getCookie('nonExistent');
    expect(nonExistent).toBe(null);
  });

  it(`4. Should handle non-JSON cookie value`, () => {
    // Simulate a non-JSON string as the cookie value
    cookieStore['sessionId'] = encodeURIComponent('abc123');

    const sessionId = getCookie('sessionId');
    expect(sessionId).toBe('abc123');
  });

  it(`5. Should remove a cookie`, () => {
    // Simulate setting a cookie to remove
    cookieStore['user'] = encodeURIComponent(JSON.stringify({ name: 'John', age: 30 }));

    removeCookie('user');
    expect(cookieStore['user']).toBeUndefined();
  });
});
