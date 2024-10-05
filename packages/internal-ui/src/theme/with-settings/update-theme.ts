import type { Theme, Components } from '@mui/material/styles';

import { components as coreComponents } from '../core/components';
import { hexToRgbChannel, createPaletteChannel } from '../styles';
import { primary as corePrimary, grey as coreGreyPalette } from '../core/palette';
import { createShadowColor, customShadows as coreCustomShadows } from '../core/custom-shadows';

import type { SettingsState } from '../../components/settings/types';
import type { ThemeComponents, CreateThemeProps, ThemeUpdateOptions } from '../types';

// ----------------------------------------------------------------------

/**
 * [1] settings @primaryColor
 * [2] settings @contrast
 */

export function updateCoreWithSettings({
  theme,
  settings,
  primaryPalette,
}: {
  theme: ThemeUpdateOptions;
  settings: SettingsState;
  primaryPalette: CreateThemeProps['primaryPalette'];
}): ThemeUpdateOptions {
  const { colorSchemes, customShadows } = theme;

  const updatedPrimary = getPalette(
    settings.primaryColor,
    corePrimary,
    settings.primaryColor && primaryPalette ? primaryPalette[settings.primaryColor] : corePrimary
  );

  return {
    ...theme,
    colorSchemes: {
      ...colorSchemes,
      light: {
        palette: {
          ...colorSchemes?.light?.palette,
          /** [1] */
          primary: updatedPrimary,
          /** [2] */
          background: {
            ...colorSchemes?.light?.palette?.background,
            default: getBackgroundDefault(settings.contrast),
            defaultChannel: hexToRgbChannel(getBackgroundDefault(settings.contrast)),
          },
        },
      },
      dark: {
        palette: {
          ...colorSchemes?.dark?.palette,
          /** [1] */
          primary: updatedPrimary,
        },
      },
    },
    customShadows: {
      ...customShadows,
      /** [1] */
      primary:
        settings.primaryColor === 'default'
          ? coreCustomShadows('light').primary
          : createShadowColor(updatedPrimary.mainChannel),
    },
  };
}

// ----------------------------------------------------------------------

export function updateComponentsWithSettings(settings: SettingsState) {
  const components: ThemeComponents = {};

  /** [2] */
  if (settings.contrast === 'hight') {
    const MuiCard: Components<Theme>['MuiCard'] = {
      styleOverrides: {
        root: ({ theme, ownerState }) => {
          let rootStyles = {};
          if (typeof coreComponents?.MuiCard?.styleOverrides?.root === 'function') {
            rootStyles = coreComponents.MuiCard.styleOverrides.root({ ownerState, theme }) ?? {};
          }

          return {
            ...rootStyles,
            boxShadow: theme.customShadows.z1,
          };
        },
      },
    };

    components.MuiCard = MuiCard;
  }

  return { components };
}

// ----------------------------------------------------------------------

function getPalette(
  name: SettingsState['primaryColor'],
  initialPalette: typeof corePrimary,
  updatedPalette: typeof corePrimary
) {
  /** [1] */
  return name === 'default' ? initialPalette : createPaletteChannel(updatedPalette);
}

function getBackgroundDefault(contrast: SettingsState['contrast']) {
  /** [2] */
  return contrast === 'default' ? '#FFFFFF' : coreGreyPalette[200];
}
