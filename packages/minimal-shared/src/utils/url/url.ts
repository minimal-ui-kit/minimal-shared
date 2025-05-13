import { isEqual } from 'es-toolkit';

// ----------------------------------------------------------------------

/**
 * Checks if a URL has query parameters.
 *
 * @param url - The URL to check.
 * @returns True if the URL has query parameters, false otherwise.
 *
 * @example
 * hasParams('https://example.com?page=1'); // true
 * hasParams('https://example.com'); // false
 */
export function hasParams(url: string): boolean {
  try {
    const urlObj = new URL(url, window.location.origin);
    return Array.from(urlObj.searchParams.keys()).length > 0;
  } catch {
    return false;
  }
}

// ----------------------------------------------------------------------

/**
 * Removes the trailing slash from a pathname if present.
 *
 * @param pathname - The pathname to process.
 * @returns The pathname without the trailing slash.
 *
 * @example
 * removeLastSlash('/dashboard/'); // '/dashboard'
 * removeLastSlash('/dashboard'); // '/dashboard'
 */
export function removeLastSlash(pathname: string): string {
  const isValid = pathname !== '/' && pathname.endsWith('/');

  return isValid ? pathname.slice(0, -1) : pathname;
}

// ----------------------------------------------------------------------

/**
 * Checks if two paths are equal after removing trailing slashes.
 *
 * @param targetUrl - The target URL to compare.
 * @param currentUrl - The pathname to compare.
 * @param options.deep - Options for deep comparison.
 * @returns True if the paths are equal, false otherwise.
 *
 * @example
 * isEqualPath('/dashboard/', '/dashboard'); // true
 * isEqualPath('/home', '/dashboard'); // false
 */
export type EqualPathOptions = {
  deep?: boolean;
};

export function isEqualPath(
  targetUrl: string,
  currentUrl: string,
  options: EqualPathOptions = {
    deep: true,
  }
): boolean {
  const parseUrl = (url: string) => {
    try {
      const { pathname, searchParams } = new URL(url.trim(), 'http://dummy');
      return options.deep
        ? { pathname: removeLastSlash(pathname), params: Object.fromEntries(searchParams) }
        : { pathname: removeLastSlash(pathname) };
    } catch {
      return { pathname: '' };
    }
  };
  return isEqual(parseUrl(currentUrl), parseUrl(targetUrl));
}

// ----------------------------------------------------------------------

/**
 * Removes query parameters from a URL and returns only the cleaned pathname.
 *
 * @param url - The URL to process.
 * @returns The pathname without query parameters.
 *
 * @example
 * removeParams('https://example.com/dashboard/user?id=123'); // '/dashboard/user'
 * removeParams('/dashboard/user?id=123'); // '/dashboard/user'
 */
export function removeParams(url: string): string {
  try {
    const urlObj = new URL(url, window.location.origin);

    return removeLastSlash(urlObj.pathname);
  } catch {
    return url;
  }
}

// ----------------------------------------------------------------------

/**
 * Determines whether a given URL is external (i.e., starts with "http").
 *
 * @param url - The URL to check.
 * @returns True if the URL is external, false otherwise.
 *
 * @example
 * isExternalLink('https://example.com'); // true
 * isExternalLink('/internal'); // false
 */
export function isExternalLink(url: string): boolean {
  return /^https?:\/\//i.test(url);
}
