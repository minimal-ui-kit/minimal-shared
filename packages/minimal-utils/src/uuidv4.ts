/* eslint-disable no-bitwise */

/**
 * Generates a UUID (version 4).
 *
 * @returns {string} - A randomly generated UUID.
 *
 * @example
 * const id = uuidv4();
 * console.log(id); // '3b12f1df-1c3a-4f3b-8f3d-3f3b1c3a4f3b'
 */

export function uuidv4(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
