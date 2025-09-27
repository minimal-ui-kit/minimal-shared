import { noRtlFlip } from './right-to-left';

// ----------------------------------------------------------------------

describe('noRtlFlip()', () => {
  it('1. Should append /* @noflip */ to a normal CSS value', () => {
    expect(noRtlFlip('margin-left: 10px;')).toBe('margin-left: 10px; /* @noflip */');
  });

  it('2. Should trim whitespace before appending', () => {
    expect(noRtlFlip('   padding-right: 20px;   ')).toBe('padding-right: 20px; /* @noflip */');
  });

  it('3. Should not duplicate the @noflip marker if already present', () => {
    expect(noRtlFlip('color: red; /* @noflip */')).toBe('color: red; /* @noflip */');
  });

  it('4. Should return empty string and warn if non-string value is provided', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(noRtlFlip(null)).toBe('');
    expect(spy).toHaveBeenCalledWith('Invalid CSS value provided');
    spy.mockRestore();
  });

  it('5. Should return empty string and warn if string is empty', () => {
    const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(noRtlFlip('   ')).toBe('');
    expect(spy).toHaveBeenCalledWith('Empty CSS value provided');
    spy.mockRestore();
  });

  it('6. Should handle CSS with line breaks', () => {
    expect(noRtlFlip('font-size: 14px;\n')).toBe('font-size: 14px; /* @noflip */');
  });
});
