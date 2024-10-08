/**
 * Checks if a URL has query parameters.
 *
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if the URL has query parameters, false otherwise.
 *
 * @example
 * const hasQueryParams = hasParams('https://example.com?page=1');
 * console.log(hasQueryParams); // true
 */

export const hasParams = (url: string): boolean => {
  const queryString = url.split('?')[1];
  return queryString ? new URLSearchParams(queryString).toString().length > 0 : false;
};

// ----------------------------------------------------------------------

/**
 * Removes the trailing slash from a pathname if it exists.
 *
 * @param {string} pathname - The pathname to process.
 * @returns {string} - The pathname without the trailing slash.
 *
 * @example
 * const cleanPathname = removeLastSlash('/dashboard/calendar/');
 * console.log(cleanPathname); // '/dashboard/calendar'
 */

export function removeLastSlash(pathname: string): string {
  /**
   * Remove last slash
   * [1]
   * @input  = '/dashboard/calendar/'
   * @output = '/dashboard/calendar'
   * [2]
   * @input  = '/dashboard/calendar'
   * @output = '/dashboard/calendar'
   */
  if (pathname !== '/' && pathname.endsWith('/')) {
    return pathname.slice(0, -1);
  }

  return pathname;
}

// ----------------------------------------------------------------------

/**
 * Removes query parameters from a URL.
 *
 * @param {string} url - The URL to process.
 * @returns {string} - The URL without query parameters.
 *
 * @example
 * const cleanUrl = removeParams('https://example.com/page?param=value');
 * console.log(cleanUrl); // 'https://example.com/page'
 */

export function removeParams(url: string): string {
  try {
    const urlObj = new URL(url, window.location.origin);

    return removeLastSlash(urlObj.pathname);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return url;
  }
}

// ----------------------------------------------------------------------

/**
 * Checks if a URL is an external link.
 *
 * @param {string} url - The URL to check.
 * @returns {boolean} - True if the URL is an external link, false otherwise.
 *
 * @example
 * const isExternal = isExternalLink('https://example.com');
 * console.log(isExternal); // true
 */

export function isExternalLink(url: string): boolean {
  return url.startsWith('http');
}
