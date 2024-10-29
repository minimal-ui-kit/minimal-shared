import { isActiveLink } from './active-link';

// ----------------------------------------------------------------------

describe('isActiveLink', () => {
  it(`1. Should return true for exact match without deep check`, () => {
    expect(isActiveLink('/dashboard/user', '/dashboard/user', false)).toBe(true);
  });

  it(`2. Should return false for non-matching paths without deep check`, () => {
    expect(isActiveLink('/dashboard/user', '/dashboard/admin', false)).toBe(false);
  });

  it(`3. Should return true for matching paths with deep check`, () => {
    expect(isActiveLink('/dashboard/user/list', '/dashboard/user', true)).toBe(true);
  });

  it(`4. Should return false for invalid item paths`, () => {
    expect(isActiveLink('/dashboard/user', '#section', true)).toBe(false);
    expect(isActiveLink('/dashboard/user', 'https://external.com', true)).toBe(false);
  });

  it(`5. Should return true for matching paths with parameters`, () => {
    expect(isActiveLink('/dashboard/test', '/dashboard/test?id=123', true)).toBe(true);
  });

  it(`6. Should return true for non-matching paths with parameters`, () => {
    expect(isActiveLink('/dashboard/test', '/dashboard/test?id=123', true)).toBe(true);
  });

  it(`7. Should return false for matching paths with deep check and parameters`, () => {
    expect(isActiveLink('/dashboard/test/list', '/dashboard/test?id=123', true)).toBe(false);
  });
});
