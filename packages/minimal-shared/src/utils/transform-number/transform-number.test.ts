import { transformValue, transformValueOnBlur, transformValueOnChange } from './transform-number';

// ----------------------------------------------------------------------

describe('transformNumber()', () => {
  describe('transformValue', () => {
    it(`1. Should return the default value for null input`, () => {
      expect(transformValue(null)).toBe('');
    });

    it(`2. Should return the default value for undefined input`, () => {
      expect(transformValue(undefined)).toBe('');
    });

    it(`3. Should return the default value for NaN input`, () => {
      expect(transformValue(NaN)).toBe('');
    });

    it(`4. Should return the string representation of a number`, () => {
      expect(transformValue(123)).toBe('123');
    });

    it(`5. Should return the string representation of a string number`, () => {
      expect(transformValue('123')).toBe('123');
    });

    it(`6. Should return the input string as is`, () => {
      expect(transformValue('test')).toBe('test');
    });
  });

  describe('transformValueOnChange', () => {
    it(`1. Should remove non-numeric characters`, () => {
      expect(transformValueOnChange('abc123.45def')).toBe('123.45');
    });

    it(`2. Should handle integer input`, () => {
      expect(transformValueOnChange(123)).toBe('123');
    });

    it(`3. Should handle decimal input`, () => {
      expect(transformValueOnChange('123.45')).toBe('123.45');
    });

    it(`4. Should handle multiple decimal points`, () => {
      expect(transformValueOnChange('123.45.67')).toBe('123.4567');
    });
  });

  describe('transformValueOnBlur', () => {
    it(`1. Should return the default value for null input`, () => {
      expect(transformValueOnBlur(null)).toBe('');
    });

    it(`2. Should return the specified default value for null input`, () => {
      expect(transformValueOnBlur(null, '0')).toBe('0');
    });

    it(`3. Should return the default value for undefined input`, () => {
      expect(transformValueOnBlur(undefined)).toBe('');
    });

    it(`4. Should return the specified default value for undefined input`, () => {
      expect(transformValueOnBlur(undefined, '0')).toBe('0');
    });

    it(`5. Should return the default value for NaN input`, () => {
      expect(transformValueOnBlur(NaN)).toBe('');
    });

    it(`6. Should return the numeric value for valid input`, () => {
      expect(transformValueOnBlur('123.45')).toBe(123.45);
    });

    it(`7. Should return the specified default value for non-numeric input`, () => {
      expect(transformValueOnBlur('abc', 'default')).toBe('default');
    });
  });
});
