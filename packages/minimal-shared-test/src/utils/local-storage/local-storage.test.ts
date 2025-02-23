import { mockLocalStorage } from '../../../tests/mocks';
import { getStorage, setStorage, removeStorage, localStorageAvailable } from './local-storage';

// ----------------------------------------------------------------------

describe('Local storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('localStorageAvailable()', () => {
    it(`1. Should return true if local storage is available`, () => {
      expect(localStorageAvailable()).toBe(true);
    });

    it(`2. Should return false if local storage is not available`, () => {
      const restore = mockLocalStorage({
        setItem: () => {
          throw new Error('Local storage is not available');
        },
        removeItem: vi.fn(),
      });
      expect(localStorageAvailable()).toBe(false);
      restore();
    });
  });

  describe('getStorage()', () => {
    it(`1. Should return parsed object value`, () => {
      const testData = { name: 'John', age: 30 };
      localStorage.setItem('user', JSON.stringify(testData));
      expect(getStorage('user')).toEqual(testData);
    });

    it(`2. Should return primitive values`, () => {
      localStorage.setItem('string', '"hello"');
      localStorage.setItem('number', '123');
      localStorage.setItem('boolean', 'true');
      localStorage.setItem('undefined', 'undefined');
      localStorage.setItem('null', 'null');

      expect(getStorage('string')).toBe('hello');
      expect(getStorage('number')).toBe(123);
      expect(getStorage('boolean')).toBe(true);
      expect(getStorage('undefined')).toBeUndefined();
      expect(getStorage('null')).toBeNull();
    });

    it(`3. Should return default value if key not found`, () => {
      const defaultValue = { default: true };
      expect(getStorage('nonexistent', defaultValue)).toEqual(defaultValue);
    });

    it(`4. Should handle invalid JSON gracefully`, () => {
      localStorage.setItem('invalid', '{invalid json}');
      expect(getStorage('invalid')).toBe('{invalid json}');
    });

    it(`5. Should return null if the item is not found and no default value is provided`, () => {
      expect(getStorage('nonexistent')).toBeNull();
    });
  });

  describe('setStorage()', () => {
    it(`1. Should set the value in local storage`, () => {
      setStorage('user', { name: 'John', age: 30 });
      expect(window.localStorage.getItem('user')).toBe(JSON.stringify({ name: 'John', age: 30 }));
    });

    it(`2. Should log an error if setting the value fails`, () => {
      const consoleErrorSpy = vi.spyOn(console, 'error');
      const message = '[setStorage]: Local storage is not available';

      const restore = mockLocalStorage({
        setItem: () => {
          console.error(message);
        },
      });

      setStorage('user', { name: 'John', age: 30 });
      expect(consoleErrorSpy).toHaveBeenCalledWith(message);

      restore();
      consoleErrorSpy.mockRestore();
    });
  });

  describe('removeStorage()', () => {
    it(`1. Should remove the item from local storage`, () => {
      window.localStorage.setItem('user', JSON.stringify({ name: 'John', age: 30 }));
      removeStorage('user');
      expect(window.localStorage.getItem('user')).toBeNull();
    });

    it(`2. Should log an error if removing the item fails`, () => {
      const consoleErrorSpy = vi.spyOn(console, 'error');
      const message = '[removeStorage]: Local storage is not available';

      const restore = mockLocalStorage({
        removeItem: () => {
          console.error(message);
        },
      });

      removeStorage('user');
      expect(consoleErrorSpy).toHaveBeenCalledWith(message);

      restore();
      consoleErrorSpy.mockRestore();
    });
  });
});
