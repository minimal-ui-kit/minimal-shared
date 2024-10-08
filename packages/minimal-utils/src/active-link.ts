import { hasParams, removeParams, isExternalLink, removeLastSlash } from './url';

// ----------------------------------------------------------------------

/**
 * Determines if a given link is active based on the current pathname.
 *
 * @param {string} pathnameProps - The current pathname.
 * @param {string} itemPath - The path of the item to check.
 * @param {boolean} [deep=true] - Whether to perform a deep check, including child paths and parameters.
 *
 * @returns {boolean} - True if the link is active, false otherwise.
 *
 * @example
 * const isActive = isActiveLink('/dashboard/user', '/dashboard/user', true);
 * console.log(isActive); // true
 */

export function isActiveLink(
  pathnameProps: string,
  itemPath: string,
  deep: boolean = true
): boolean {
  const pathname = removeLastSlash(pathnameProps);

  const pathHasParams = hasParams(itemPath);

  // Check if the item path is invalid (starts with '#' or is an external link)
  const notValid = itemPath.startsWith('#') || isExternalLink(itemPath);

  if (notValid) {
    return false;
  }

  // Determine if a deep check is needed
  const isDeep = deep || pathHasParams;

  if (isDeep) {
    // Deep check: default
    // Example: itemPath = '/dashboard/user'
    // Matches: pathname = '/dashboard/user', '/dashboard/user/list', '/dashboard/user/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b15/edit'
    const defaultActive = pathname.includes(itemPath);

    // Deep check: has params
    // Example: itemPath = '/dashboard/test?id=e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1'
    // Matches: pathname = '/dashboard/test'
    const originItemPath = removeParams(itemPath);
    const hasParamsActive = pathHasParams && originItemPath === pathname;

    return defaultActive || hasParamsActive;
  }

  // Normal check: active
  // Example: itemPath = '/dashboard/calendar'
  // Matches: pathname = '/dashboard/calendar'
  return pathname === itemPath;
}
