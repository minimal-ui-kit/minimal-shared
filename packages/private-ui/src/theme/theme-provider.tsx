'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';

import { createTheme } from './create-theme';
import { RTL } from './with-settings/right-to-left';

import type {} from '../app.theme';
import type { CreateThemeProps } from './types';

// ----------------------------------------------------------------------

type Props = CreateThemeProps & {
  children: React.ReactNode;
};

export function ThemeProvider({ children, settings, localeComponents, primaryPalette }: Props) {
  const theme = createTheme({ settings, localeComponents, primaryPalette });

  console.log('settings', settings);

  return (
    <CssVarsProvider theme={theme} defaultMode={settings?.colorScheme} modeStorageKey="theme-mode">
      <CssBaseline />
      {children}

      {settings?.direction === 'rtl' ? <RTL direction="rtl">{children}</RTL> : children}
    </CssVarsProvider>
  );
}
