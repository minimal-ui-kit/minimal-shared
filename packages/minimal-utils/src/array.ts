/**
 * Flattens an array of objects based on a specified key.
 *
 * @template T - The type of the objects in the array.
 * @param {T[]} list - The array of objects to flatten.
 * @param {string} [key='children'] - The key to use for flattening the array. Defaults to 'children'.
 * @returns {T[]} - Returns a new flattened array of objects.
 *
 * @example
 * const data = [
 *   { id: 1, children: [{ id: 2 }, { id: 3, children: [{ id: 4 }] }] },
 *   { id: 5 }
 * ];
 *
 * console.log(flattenArray(data));
 * // Output: [
 * //   { id: 1, children: [{ id: 2 }, { id: 3, children: [{ id: 4 }] }] },
 * //   { id: 2 },
 * //   { id: 3, children: [{ id: 4 }] },
 * //   { id: 4 },
 * //   { id: 5 }
 * // ]
 */
export function flattenArray<T extends Record<string, any>>(
  list: T[],
  key: string = 'children'
): T[] {
  let children: T[] = [];

  const flatten = list.map((item: T) => {
    if (Array.isArray(item[key]) && item[key].length) {
      children = [...children, ...item[key]];
    }
    return item;
  });

  return flatten.concat(children.length ? flattenArray(children, key) : []);
}
