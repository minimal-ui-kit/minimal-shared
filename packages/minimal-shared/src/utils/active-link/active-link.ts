import { hasParams, removeParams, isExternalLink, removeLastSlash } from '../url';

// ----------------------------------------------------------------------

/**
 * Determines whether a given target path is considered "active"
 * based on the current pathname — typically used for highlighting
 * active navigation links.
 *
 * ✅ Features:
 * - Removes trailing slashes and query parameters before comparison.
 * - Ignores external links (e.g. `https://...`) and hash links (e.g. `#section`).
 * - Supports deep matching to detect nested routes or links with query strings.
 *
 * @param {string} currentPathname - The current URL pathname (e.g., from `window.location.pathname` or router).
 * @param {string} targetPath - The target path to check (can include query parameters).
 * @param {boolean} [deep=true] - If true, performs deep matching (for nested routes or param links).
 *
 * @returns {boolean} - Returns `true` if the target path is considered active; otherwise, `false`.
 *
 * @example
 * isActiveLink('/dashboard/user/list', '/dashboard/user');          // true (deep match)
 * isActiveLink('/dashboard/user', '/dashboard/user?id=123');        // true (query param)
 * isActiveLink('/dashboard/user', '/dashboard/user', false);        // true (exact match)
 * isActiveLink('/dashboard/user', '/dashboard');                    // false
 * isActiveLink('/dashboard/user', '#section');                      // false (hash link)
 * isActiveLink('/dashboard/user', 'https://example.com');           // false (external link)
 */
export function isActiveLink(
  currentPathname: string,
  targetPath: string,
  deep: boolean = true
): boolean {
  if (!currentPathname || !targetPath) {
    console.warn('isActiveLink: pathname or itemPath is empty!');
    return false;
  }

  if (targetPath.startsWith('#') || isExternalLink(targetPath)) {
    return false;
  }

  const pathname = removeLastSlash(currentPathname);
  const cleanedItemPath = removeLastSlash(removeParams(targetPath));
  const isDeep = deep || hasParams(targetPath);

  // For deep match (nested routes)
  if (isDeep) {
    return (
      pathname === cleanedItemPath ||
      pathname.startsWith(`${cleanedItemPath}/`) ||
      pathname.startsWith(`${cleanedItemPath}?`)
    );
  }

  // For exact match
  return pathname === cleanedItemPath;
}
