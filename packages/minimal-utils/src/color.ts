/**
 * Converts a hex color to RGB channels.
 *
 * @param {string} hex - The hex color string.
 * @returns {string} - The RGB channels string.
 * @throws {Error} - Throws an error if the hex color is invalid.
 *
 * @example
 * const rgbChannel = hexToRgbChannel("#C8FAD6");
 * console.log(rgbChannel); // "200 250 214"
 */
export function hexToRgbChannel(hex: string): string {
  if (!/^#[0-9A-F]{6}$/i.test(hex)) {
    throw new Error(`Invalid hex color: ${hex}`);
  }

  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);

  return `${r} ${g} ${b}`;
}

// ----------------------------------------------------------------------

/**
 * Converts a hex palette color to RGB channels palette.
 *
 * @typedef {Object} InputPalette - The input palette object with hex color strings.
 * @property {string} lighter - The lighter hex color.
 * @property {string} light - The light hex color.
 * @property {string} main - The main hex color.
 *
 * @typedef {Object} ChannelPalette - The output palette object with RGB channels.
 * @property {string} lighterChannel - The lighter RGB channels.
 * @property {string} lightChannel - The light RGB channels.
 * @property {string} mainChannel - The main RGB channels.
 *
 * @param {InputPalette} hexPalette - The input palette object.
 * @returns {ChannelPalette} - The output palette object with RGB channels.
 *
 * @example
 * const palette = createPaletteChannel({
 *   lighter: "#C8FAD6",
 *   light: "#5BE49B",
 *   main: "#00A76F",
 * });
 * console.log(palette);
 * // {
 * //   lighter: "#C8FAD6",
 * //   light: "#5BE49B",
 * //   main: "#00A76F",
 * //   lighterChannel: "200 250 214",
 * //   lightChannel: "91 228 155",
 * //   mainChannel: "0 167 111",
 * // }
 */
export type InputPalette = Record<string, string>;

export type ChannelPalette<T extends InputPalette> = T & {
  [K in keyof T as `${string & K}Channel`]: string;
};

export function createPaletteChannel<T extends InputPalette>(hexPalette: T): ChannelPalette<T> {
  const channelPalette: Record<string, string> = {};

  Object.entries(hexPalette).forEach(([key, value]) => {
    channelPalette[`${key}Channel`] = hexToRgbChannel(value);
  });

  return { ...hexPalette, ...channelPalette } as ChannelPalette<T>;
}

// ----------------------------------------------------------------------

/**
 * Adds an alpha channel to a color.
 *
 * @param {string} color - The color string in RGB channels or CSS variable format.
 * @param {number} [opacity=1] - The opacity value.
 * @returns {string} - The color string with alpha channel.
 * @throws {Error} - Throws an error if the color format is unsupported.
 *
 * @example
 * const rgbaColor = varAlpha('200 250 214', 0.8);
 * console.log(rgbaColor); // "rgba(200 250 214 / 0.8)"
 *
 * const rgbaVarColor = varAlpha('var(--palette-primary-lighterChannel)', 0.8);
 * console.log(rgbaVarColor); // "rgba(var(--palette-primary-lighterChannel) / 0.8)"
 */
export function varAlpha(color: string, opacity = 1): string {
  const unsupported =
    color.startsWith('#') ||
    color.startsWith('rgb') ||
    color.startsWith('rgba') ||
    (!color.includes('var') && color.includes('Channel'));

  if (unsupported) {
    throw new Error(
      `[Alpha]: Unsupported color format "${color}".
       Supported formats are:
       - RGB channels: "0 184 217".
       - CSS variables with "Channel" prefix: "var(--palette-common-blackChannel, #000000)".
       Unsupported formats are:
       - Hex: "#00B8D9".
       - RGB: "rgb(0, 184, 217)".
       - RGBA: "rgba(0, 184, 217, 1)".
       `
    );
  }

  return `rgba(${color} / ${opacity})`;
}
