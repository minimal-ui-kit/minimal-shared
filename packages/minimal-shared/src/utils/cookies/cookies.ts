/**
 * Retrieves a cookie value by key.
 *
 * @param {string} key - The key of the cookie to retrieve.
 * @returns {any | null} - The parsed value of the cookie, or null if not found or an error occurs.
 *
 * @example
 * const user = getCookie('user');
 * console.log(user); // { name: 'John', age: 30 }
 */

export function getCookie(key: string): any | null {
  try {
    const keyName = `${key}=`;
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');

    for (const val of cArr) {
      if (val.startsWith(keyName)) {
        const cookieValue = val.substring(keyName.length);
        try {
          return JSON.parse(cookieValue);
        } catch {
          return cookieValue;
        }
      }
    }
  } catch {
    return null;
  }

  return null;
}

// ----------------------------------------------------------------------

/**
 * Sets a cookie with a specified key, value, and expiration time.
 *
 * @template T
 * @param {string} key - The key of the cookie to set.
 * @param {T} value - The value of the cookie to set.
 * @param {number} [daysUntilExpiration=0] - The number of days until the cookie expires. Defaults to session cookie if not set.
 *
 * @example
 * setCookie('user', { name: 'John', age: 30 }, 7);
 */

export function setCookie<T>(key: string, value: T, daysUntilExpiration: number = 0): void {
  try {
    const serializedValue = encodeURIComponent(JSON.stringify(value));
    let cookieOptions = `${key}=${serializedValue}; path=/`;

    if (daysUntilExpiration > 0) {
      const expirationDate = new Date(Date.now() + daysUntilExpiration * 24 * 60 * 60 * 1000);
      cookieOptions += `; expires=${expirationDate.toUTCString()}`;
    }

    document.cookie = cookieOptions;
  } catch (error) {
    console.error('Error while setting cookie:', error);
  }
}

// ----------------------------------------------------------------------

/**
 * Removes a cookie by key.
 *
 * @param {string} key - The key of the cookie to remove.
 *
 * @example
 * removeCookie('user');
 */

export function removeCookie(key: string): void {
  try {
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  } catch (error) {
    console.error('Error while removing cookie:', error);
  }
}
