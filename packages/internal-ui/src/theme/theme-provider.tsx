'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { createTheme } from './create-theme';
import { isPresent } from '../components/settings';
import { RTL } from './with-settings/right-to-left';

import type {} from '../app.theme';
import type { SettingsState } from '../components/settings';
import type { CreateThemeProps, ThemeUpdateOptions } from './types';

// ----------------------------------------------------------------------

type Props = CreateThemeProps & {
  settings?: SettingsState;
  children: React.ReactNode;
  defaultSettings?: SettingsState;
  overridesTheme?: ThemeUpdateOptions;
};

export function ThemeProvider({
  children,
  settings,
  overridesTheme,
  primaryPalette,
  defaultSettings,
  localeComponents,
}: Props) {
  const theme = createTheme({ settings, localeComponents, primaryPalette, overridesTheme });

  const hasDirection = isPresent(defaultSettings, 'direction');

  return (
    <CssVarsProvider
      theme={theme}
      defaultMode={defaultSettings?.colorScheme}
      modeStorageKey="theme-mode"
    >
      <CssBaseline />
      {hasDirection ? <RTL direction={settings?.direction}>{children}</RTL> : children}
    </CssVarsProvider>
  );
}
