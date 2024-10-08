/**
 * Retrieves a value from local storage by key.
 *
 * @param {string} key - The key of the item to retrieve.
 * @returns {any | null} - The parsed value of the item, or null if not found or an error occurs.
 *
 * @example
 * const user = getStorage('user');
 * console.log(user); // { name: 'John', age: 30 }
 */

export function getStorage(key: string): any | null {
  try {
    const result = localStorageGetItem(key);

    if (result) {
      return JSON.parse(result);
    }
  } catch (error) {
    console.error('Error while getting from storage:', error);
  }

  return null;
}

// ----------------------------------------------------------------------

/**
 * Sets a value in local storage with a specified key.
 *
 * @template T
 * @param {string} key - The key of the item to set.
 * @param {T} value - The value of the item to set.
 *
 * @example
 * setStorage('user', { name: 'John', age: 30 });
 */

export function setStorage<T>(key: string, value: T): void {
  try {
    const serializedValue = JSON.stringify(value);
    window.localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error while setting storage:', error);
  }
}

// ----------------------------------------------------------------------

/**
 * Removes an item from local storage by key.
 *
 * @param {string} key - The key of the item to remove.
 *
 * @example
 * removeStorage('user');
 */

export function removeStorage(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error('Error while removing from storage:', error);
  }
}

// ----------------------------------------------------------------------

/**
 * Checks if local storage is available.
 *
 * @returns {boolean} - True if local storage is available, false otherwise.
 *
 * @example
 * const isAvailable = localStorageAvailable();
 * console.log(isAvailable); // true or false
 */

export function localStorageAvailable(): boolean {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    window.localStorage.setItem(key, key);
    window.localStorage.removeItem(key);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
}

// ----------------------------------------------------------------------

/**
 * Retrieves a value from local storage by key, with an optional default value.
 *
 * @param {string} key - The key of the item to retrieve.
 * @param {string} [defaultValue=''] - The default value to return if the item is not found.
 * @returns {string | undefined} - The value of the item, or the default value if not found.
 *
 * @example
 * const value = localStorageGetItem('theme', 'light');
 * console.log(value); // 'dark' or 'light'
 */

export function localStorageGetItem(key: string, defaultValue: string = ''): string | undefined {
  if (!localStorageAvailable()) {
    return defaultValue;
  }

  const value = localStorage.getItem(key);
  return value !== null ? value : defaultValue;
}
