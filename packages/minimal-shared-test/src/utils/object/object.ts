/**
 * Checks if the given object contains all the specified keys.
 *
 * @template T - The type of the object.
 * @param {T} obj - The object to check.
 * @param {Array<keyof T>} keys - An array of keys to check for in the object.
 * @returns {boolean} - Returns true if the object contains all the specified keys, otherwise false.
 *
 * @example
 * const settings = {
 *   fontFamily: 'Arial',
 *   compactLayout: true,
 *   direction: 'ltr',
 *   colorScheme: 'light',
 *   contrast: 'default',
 *   navColor: 'integrate',
 *   navLayout: 'vertical',
 *   primaryColor: 'blue',
 *};
 *
 * console.log(hasKeys(settings, ['fontFamily', 'direction'])); // true
 * console.log(hasKeys(settings, ['test'])); // false
 */

// export function hasKeys<T>(obj: T | null | undefined, keys: (string | keyof T)[]): boolean {
//   if (!obj || !keys.length) {
//     return false;
//   }

//   return keys.every((key) => Object.prototype.hasOwnProperty.call(obj, key));
// }

export function hasKeys<T>(obj: T | null | undefined, keys: (keyof T | string)[]): boolean {
  if (!obj || !keys.length || typeof obj !== 'object') {
    return false;
  }

  return keys.every((key) => key in obj);
}
