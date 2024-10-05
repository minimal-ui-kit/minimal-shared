import type { Theme } from '@mui/material/styles';

import { experimental_extendTheme as extendTheme } from '@mui/material/styles';

import { setFont } from './styles/utils';
import { shadows, typography, components, colorSchemes, customShadows } from './core';
import { updateCoreWithSettings, updateComponentsWithSettings } from './with-settings/update-theme';

import type { CreateThemeProps } from './types';

// ----------------------------------------------------------------------

export function createTheme(props?: CreateThemeProps): Theme {
  const settings = props?.settings;
  const localeComponents = props?.localeComponents || {};
  const overridesTheme = props?.overridesTheme || {};

  const initialTheme = {
    colorSchemes,
    shadows: shadows(props?.settings?.colorScheme ?? 'light'),
    customShadows: customShadows(props?.settings?.colorScheme ?? 'light'),
    direction: props?.settings?.direction ?? 'ltr',
    shape: { borderRadius: 8 },
    components,
    typography: props?.settings?.fontFamily
      ? { ...typography, fontFamily: setFont(props.settings.fontFamily) }
      : typography,
    cssVarPrefix: '',
    shouldSkipGeneratingVar,
  };

  /**
   * 1.Update values from settings before creating theme.
   */
  const updateTheme = settings
    ? updateCoreWithSettings({
        theme: initialTheme,
        settings,
        primaryPalette: props?.primaryPalette,
      })
    : initialTheme;

  /**
   * 2.Create theme + add locale + update component with settings.
   */
  const settingsComponents = settings ? updateComponentsWithSettings(settings) : {};

  const theme = extendTheme(updateTheme, localeComponents, settingsComponents, overridesTheme);

  return theme;
}

// ----------------------------------------------------------------------

function shouldSkipGeneratingVar(keys: string[], value: string | number): boolean {
  const skipGlobalKeys = [
    'mixins',
    'overlays',
    'direction',
    'breakpoints',
    'cssVarPrefix',
    'unstable_sxConfig',
    'typography',
    // 'transitions',
  ];

  const skipPaletteKeys: {
    [key: string]: string[];
  } = {
    global: ['tonalOffset', 'dividerChannel', 'contrastThreshold'],
    grey: ['A100', 'A200', 'A400', 'A700'],
    text: ['icon'],
  };

  const isPaletteKey = keys[0] === 'palette';

  if (isPaletteKey) {
    const paletteType = keys[1];
    const skipKeys = skipPaletteKeys[paletteType] || skipPaletteKeys.global;

    return keys.some((key) => skipKeys?.includes(key));
  }

  return keys.some((key) => skipGlobalKeys?.includes(key));
}

/**
* createTheme without @settings and @locale components.
*
 ```jsx
export function createTheme(): Theme {
  const initialTheme = {
    colorSchemes,
    shadows: shadows('light'),
    customShadows: customShadows('light'),
    shape: { borderRadius: 8 },
    components,
    typography,
    cssVarPrefix: '',
    shouldSkipGeneratingVar,
  };

  const theme = extendTheme(initialTheme, overridesTheme);

  return theme;
}
 ```
*/
