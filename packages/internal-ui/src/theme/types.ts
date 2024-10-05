import type { Theme as BaseTheme } from '@mui/material/styles/createTheme';
import type { CssVarsTheme, CssVarsThemeOptions } from '@mui/material/styles';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

import type { SettingsState } from '../components/settings/types';

// ----------------------------------------------------------------------

export type Theme = Omit<BaseTheme, 'palette' | 'applyStyles'> & CssVarsTheme;

export type ThemeUpdateOptions = Omit<CssVarsThemeOptions, 'typography'> & {
  typography?: TypographyOptions;
};

export type ThemeComponents = CssVarsThemeOptions['components'];

export type ThemeLocaleComponents = { components: ThemeComponents };

export type CreateThemeProps = {
  settings?: SettingsState;
  localeComponents?: ThemeLocaleComponents;
  overridesTheme?: ThemeUpdateOptions;
  primaryPalette?: Record<
    string,
    {
      lighter: string;
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    }
  >;
};
