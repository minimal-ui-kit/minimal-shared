import { hasParams, isEqualPath, removeParams, isExternalLink, removeLastSlash } from './url';

// ----------------------------------------------------------------------

const mapWithIndex = <T extends readonly any[][]>(cases: T) =>
  cases.map((testCase, index) => [index + 1, ...testCase] as const);

describe('hasParams()', () => {
  const cases = [
    ['Should return true with single param', '/dashboard?page=1', true],
    ['Should return true with multiple params', '/dashboard?x=1&y=2', true],
    ['Should return false with no params', '/dashboard', false],
    ['Should return false with trailing "?"', '/dashboard?', false],
    ['Should return false for empty string', '', false],
  ];

  test.each(mapWithIndex(cases))('%i. %s', (_i, _desc, input, expected) => {
    expect(hasParams(input)).toBe(expected);
  });
});

describe('removeLastSlash()', () => {
  const cases = [
    ['Removes trailing slash', '/dashboard/', '/dashboard'],
    ['Keeps path without slash', '/dashboard', '/dashboard'],
    ['Removes slash from nested path', '/dashboard/user/', '/dashboard/user'],
    ['Preserves root slash', '/', '/'],
    ['Removes extra trailing slashes', '/test//', '/test/'],
  ];

  test.each(mapWithIndex(cases))('%i. %s', (_i, _desc, input, expected) => {
    expect(removeLastSlash(input)).toBe(expected);
  });
});

describe('isEqualPath()', () => {
  const cases = [
    ['Exact match', '/dashboard', '/dashboard', true],
    ['Match with trailing slash', '/dashboard/', '/dashboard', true],
    ['Both paths have trailing slashes', '/dashboard/', '/dashboard/', true],
    ['Different paths', '/dashboard', '/settings', false],
  ];

  test.each(mapWithIndex(cases))('%i. %s', (_i, _desc, a, b, expected) => {
    expect(isEqualPath(a, b)).toBe(expected);
  });
});

describe('removeParams()', () => {
  const cases = [
    ['Removes simple query', '/dashboard?page=1', '/dashboard'],
    ['Removes complex query', '/dashboard/user?id=123&filter=active', '/dashboard/user'],
    ['Ignores when no query', '/dashboard/user', '/dashboard/user'],
    ['Removes query with trailing slash', '/dashboard/user/?id=1', '/dashboard/user'],
    ['Removes query from full URL', 'https://example.com/page?id=1', '/page'],
  ];

  test.each(mapWithIndex(cases))('%i. %s', (_i, _desc, input, expected) => {
    expect(removeParams(input)).toBe(expected);
  });
});

describe('isExternalLink()', () => {
  const cases = [
    ['Detects http link', 'http://example.com', true],
    ['Detects https link', 'https://example.com', true],
    ['Returns false for local path', '/dashboard', false],
    ['Returns false for anchor', '#section', false],
    ['Does not false-positive on "http123"', 'http123', false],
  ];

  test.each(mapWithIndex(cases))('%i. %s', (_i, _desc, input, expected) => {
    expect(isExternalLink(input)).toBe(expected);
  });
});
