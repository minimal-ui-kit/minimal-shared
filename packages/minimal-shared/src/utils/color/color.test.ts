import { varAlpha, hexToRgbChannel, createPaletteChannel } from './color';

// ----------------------------------------------------------------------

describe('hexToRgbChannel()', () => {
  it(`1. Should convert hex color to RGB channels`, () => {
    expect(hexToRgbChannel('#C8FAD6')).toBe('200 250 214');
  });

  it(`2. Should throw an error if hex color is undefined`, () => {
    expect(() => hexToRgbChannel('')).toThrow('Hex color is undefined!');
  });

  it(`3. Should throw an error if hex color is invalid`, () => {
    expect(() => hexToRgbChannel('#ZZZZZZ')).toThrow('Invalid hex color: #ZZZZZZ');
  });
});

describe('createPaletteChannel()', () => {
  it(`1. Should convert hex palette to RGB channels palette`, () => {
    const palette = createPaletteChannel({
      lighter: '#C8FAD6',
      light: '#5BE49B',
      main: '#00A76F',
    });
    expect(palette).toEqual({
      lighter: '#C8FAD6',
      light: '#5BE49B',
      main: '#00A76F',
      lighterChannel: '200 250 214',
      lightChannel: '91 228 155',
      mainChannel: '0 167 111',
    });
  });

  it(`2. Should handle undefined values in the palette`, () => {
    const palette = createPaletteChannel({
      lighter: '#C8FAD6',
      light: undefined,
      main: '#00A76F',
    });
    expect(palette).toEqual({
      lighter: '#C8FAD6',
      light: undefined,
      main: '#00A76F',
      lighterChannel: '200 250 214',
      mainChannel: '0 167 111',
    });
  });
});

describe('varAlpha()', () => {
  it(`1. Should add alpha channel to RGB channels`, () => {
    expect(varAlpha('200 250 214', 0.8)).toBe('rgba(200 250 214 / 80%)');
    expect(varAlpha('200 250 214', '48%')).toBe('rgba(200 250 214 / 48%)');
    expect(varAlpha('200 250 214', '0.24')).toBe('rgba(200 250 214 / 24%)');
  });

  it(`2. Should add alpha channel to CSS variable`, () => {
    expect(varAlpha('var(--palette-primary-lighterChannel)', 0.8)).toBe(
      'rgba(var(--palette-primary-lighterChannel) / 80%)'
    );
    expect(varAlpha('var(--palette-primary-lighterChannel)', '48%')).toBe(
      'rgba(var(--palette-primary-lighterChannel) / 48%)'
    );
    expect(varAlpha('var(--palette-primary-lighterChannel)', 'var(--opacity)')).toBe(
      'rgba(var(--palette-primary-lighterChannel) / calc(var(--opacity) * 100%))'
    );
  });

  it(`3. Should handle currentColor`, () => {
    expect(varAlpha('currentColor', 0.5)).toBe('color-mix(in srgb, currentColor 50%, transparent)');
    expect(varAlpha('currentColor', '48%')).toBe(
      'color-mix(in srgb, currentColor 48%, transparent)'
    );
    expect(varAlpha('currentColor', 'var(--opacity)')).toBe(
      'color-mix(in srgb, currentColor calc(var(--opacity) * 100%), transparent)'
    );
  });

  it(`4. Should throw an error if color is undefined`, () => {
    expect(() => varAlpha('', 0.8)).toThrow(Error);
    expect(() => varAlpha('   ', 0.8)).toThrow(Error);
  });

  it(`5. Should throw an error if color format is unsupported`, () => {
    expect(() => varAlpha('#00B8D9', 0.8)).toThrow(Error);
    expect(() => varAlpha('rgb(0, 184, 217)', 0.8)).toThrow(Error);
    expect(() => varAlpha('rgba(0, 184, 217, 1)', 0.8)).toThrow(Error);
    expect(() => varAlpha('500Channel', 0.8)).toThrow(Error);
  });

  it(`6. Should throw an error for invalid opacity`, () => {
    expect(() => varAlpha('200 250 214', 1.5)).toThrow(Error);
    expect(() => varAlpha('200 250 214', -0.1)).toThrow(Error);
    expect(() => varAlpha('200 250 214', 'bad')).toThrow(Error);
    expect(() => varAlpha('currentColor', 'bad')).toThrow(Error);
  });
});
