import { setFont, remToPx, pxToRem } from './font';

// ----------------------------------------------------------------------

describe('setFont()', () => {
  it(`1. Should return the default font family if no font name is provided`, () => {
    const result = setFont();
    expect(result).toBe(
      `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
    );
  });

  it(`2. Should return the complete font family string if a font name is provided`, () => {
    const result = setFont('CustomFont');
    expect(result).toBe(
      `"CustomFont", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`
    );
  });
});

describe('remToPx()', () => {
  it(`1. Should convert rem to px correctly`, () => {
    expect(remToPx('1.5rem')).toBe(24);
  });

  // it(`2. Should throw an error for invalid rem value`, () => {
  //   expect(() => remToPx('invalid')).toThrow('Invalid rem value: invalid');
  // });
});

describe('pxToRem()', () => {
  it(`1. Should convert px to rem correctly`, () => {
    expect(pxToRem(24)).toBe('1.5rem');
  });

  // it(`2. Should throw an error for invalid pixel value`, () => {
  //   expect(() => pxToRem(NaN)).toThrow('Invalid pixel value: NaN');
  // });
});
