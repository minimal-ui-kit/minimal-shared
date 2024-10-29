import { highlightText } from '../../../tests/highlight-text';
import { hasParams, removeParams, isExternalLink, removeLastSlash } from './url';

// ----------------------------------------------------------------------

describe('hasParams()', () => {
  it(`1. Should return ${highlightText.value('true')} if URL has query parameters`, () => {
    expect(hasParams('https://example.com?page=1')).toBe(true);
  });

  it(`2. Should return ${highlightText.value('false')} if URL does not have query parameters`, () => {
    expect(hasParams('https://example.com')).toBe(false);
  });

  it(`3. Should return ${highlightText.value('false')} if URL has empty query parameters`, () => {
    expect(hasParams('https://example.com?')).toBe(false);
  });
});

describe('removeLastSlash()', () => {
  it(`1. Should remove trailing slash from pathname`, () => {
    expect(removeLastSlash('/dashboard/calendar/')).toBe('/dashboard/calendar');
  });

  it(`2. Should return the same pathname if there is no trailing slash`, () => {
    expect(removeLastSlash('/dashboard/calendar')).toBe('/dashboard/calendar');
  });

  it(`3. Should not remove the slash if pathname is just "/"`, () => {
    expect(removeLastSlash('/')).toBe('/');
  });
});

describe('removeParams()', () => {
  it(`1. Should remove query parameters from URL`, () => {
    expect(removeParams('https://example.com/page?param=value')).toBe('/page');
  });

  it(`2. Should return the same URL if there are no query parameters`, () => {
    expect(removeParams('https://example.com/page')).toBe('/page');
  });

  it(`3. Should return the same URL if there are no query parameters`, () => {
    expect(removeParams('https://example.com/')).toBe('/');
  });

  it(`4. Should return the same URL if there are no query parameters`, () => {
    expect(removeParams('https://example.com')).toBe('/');
  });

  it(`5. Should return the same URL if it is invalid`, () => {
    expect(removeParams('invalid-url')).toBe('/invalid-url');
  });
});

describe('isExternalLink()', () => {
  it(`1. Should return ${highlightText.value('true')} if URL is an external link`, () => {
    expect(isExternalLink('https://example.com')).toBe(true);
  });

  it(`2. Should return ${highlightText.value('false')} if URL is not an external link`, () => {
    expect(isExternalLink('/internal/page')).toBe(false);
  });

  it(`3. Should return ${highlightText.value('true')} if URL starts with http`, () => {
    expect(isExternalLink('http://example.com')).toBe(true);
  });
});
