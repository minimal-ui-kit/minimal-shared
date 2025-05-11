import { parseCssVar } from './css-variables';

// ----------------------------------------------------------------------

describe('parseCssVar()', () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  afterEach(() => {
    errorSpy.mockClear();
  });

  afterAll(() => {
    errorSpy.mockRestore();
  });

  it('1. Extracts variable without fallback', () => {
    expect(parseCssVar('var(--palette-Tooltip-bg)')).toBe('--palette-Tooltip-bg');
  });

  it('2. Extracts variable with fallback', () => {
    expect(parseCssVar('var(--palette-Tooltip-bg, rgba(69, 79, 91, 0.92))')).toBe(
      '--palette-Tooltip-bg'
    );
  });

  it('3. Returns empty string on empty or non-string input', () => {
    const badInputs = [null, undefined, '', 123, {}, true];

    for (const val of badInputs) {
      expect(parseCssVar(val)).toBe('');
    }

    expect(errorSpy).toHaveBeenCalledTimes(badInputs.length);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid input'));
  });

  it('4. Returns empty string on invalid CSS var() format', () => {
    const invalidFormats = ['rgba(0,0,0,0.5)', 'var(-bad)', 'var()', 'var(--bad value)'];

    for (const val of invalidFormats) {
      expect(parseCssVar(val)).toBe('');
    }

    expect(errorSpy).toHaveBeenCalledTimes(invalidFormats.length);
    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Invalid CSS variable format'));
  });
});
