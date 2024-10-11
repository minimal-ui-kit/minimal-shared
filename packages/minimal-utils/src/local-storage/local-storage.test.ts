import { highlightText } from '../../tests/highlight-text';
import {
  getStorage,
  setStorage,
  removeStorage,
  localStorageGetItem,
  localStorageAvailable,
} from './local-storage';

// ----------------------------------------------------------------------

describe('localStorageAvailable()', () => {
  it(`1. Should return ${highlightText.value('true')} if local storage is available`, () => {
    expect(localStorageAvailable()).toBe(true);
  });

  it(`2. Should return ${highlightText.value('false')} if local storage is not available`, () => {
    const originalLocalStorage = window.localStorage;

    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: () => {
          throw new Error('Local storage is not available');
        },
        removeItem: () => {},
      },
      configurable: true,
    });

    expect(localStorageAvailable()).toBe(false);

    Object.defineProperty(window, 'localStorage', { value: originalLocalStorage });
  });
});

describe('localStorageGetItem()', () => {
  it(`1. Should return the value from local storage`, () => {
    window.localStorage.setItem('theme', 'dark');
    expect(localStorageGetItem('theme', 'light')).toBe('dark');
  });

  it(`2. Should return the default value if the item is not found`, () => {
    expect(localStorageGetItem('nonexistent', 'default')).toBe('default');
  });

  it(`3. Should return the default value if local storage is not available`, () => {
    const originalLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => {
          throw new Error('Local storage is not available');
        },
      },
      configurable: true,
    });

    expect(localStorageGetItem('theme', 'light')).toBe('light');

    Object.defineProperty(window, 'localStorage', { value: originalLocalStorage });
  });
});

describe('getStorage()', () => {
  it(`1.Should return the parsed value from local storage`, () => {
    window.localStorage.setItem('user', JSON.stringify({ name: 'John', age: 30 }));
    expect(getStorage('user')).toEqual({ name: 'John', age: 30 });
  });

  it(`2.Should return the raw value if parsing fails`, () => {
    window.localStorage.setItem('user', 'John');
    expect(getStorage('user')).toBe('John');
  });

  it(`3.Should return null if the item is not found`, () => {
    expect(getStorage('nonexistent')).toBeNull();
  });
});

describe('setStorage()', () => {
  it(`1.Should set the value in local storage`, () => {
    setStorage('user', { name: 'John', age: 30 });
    expect(window.localStorage.getItem('user')).toBe(JSON.stringify({ name: 'John', age: 30 }));
  });

  it(`2.Should log an error if setting the value fails`, () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');
    const originalLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: () => {
          throw new Error('Local storage is not available');
        },
      },
      configurable: true,
    });

    setStorage('user', { name: 'John', age: 30 });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error while setting storage:', expect.any(Error));

    Object.defineProperty(window, 'localStorage', { value: originalLocalStorage });
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
    const originalLocalStorage = window.localStorage;
    Object.defineProperty(window, 'localStorage', {
      value: {
        removeItem: () => {
          throw new Error('Local storage is not available');
        },
      },
      configurable: true,
    });

    removeStorage('user');
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error while removing from storage:',
      expect.any(Error)
    );

    Object.defineProperty(window, 'localStorage', { value: originalLocalStorage });
    consoleErrorSpy.mockRestore();
  });
});
