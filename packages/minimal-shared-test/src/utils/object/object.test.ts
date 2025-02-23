import { hasKeys } from './object';
import { highlightText } from '../../../tests/highlight-text';

// ----------------------------------------------------------------------

const settings = {
  fontFamily: 'Arial',
  compactLayout: true,
  direction: 'ltr',
  colorScheme: 'light',
  contrast: 'default',
  navColor: 'integrate',
  navLayout: 'vertical',
  primaryColor: 'blue',
};

describe('hasKeys', () => {
  it(`1. Should return ${highlightText.val('true')} if the object contains all the specified keys`, () => {
    expect(hasKeys(settings, ['fontFamily', 'direction'])).toBe(true);
  });

  it(`2. Should return ${highlightText.val('false')} if the object does not contain all the specified keys`, () => {
    expect(hasKeys(settings, ['nonExistentKey'])).toBe(false);
  });

  it(`3. Should return ${highlightText.val('true')} if the keys array is empty`, () => {
    expect(hasKeys(settings, [])).toBe(false);
  });

  it(`4. Should return ${highlightText.val('false')} if the object is empty and keys array is not empty`, () => {
    expect(hasKeys({}, ['fontFamily'])).toBe(false);
  });

  it(`5. Should return ${highlightText.val('true')} if the object contains all the specified keys with different types`, () => {
    expect(hasKeys(settings, ['fontFamily', 'compactLayout', 'direction'])).toBe(true);
  });

  it(`6. Should return ${highlightText.val('false')} if the object is null or undefined`, () => {
    expect(hasKeys(null, ['fontFamily'])).toBe(false);
    expect(hasKeys(undefined, ['fontFamily'])).toBe(false);
  });
});
