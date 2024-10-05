import 'src/global.css';

import type {} from 'embla-carousel-autoplay';
import type {} from 'embla-carousel-auto-scroll';

// ----------------------------------------------------------------------

import type { SettingsState } from 'internal-ui/components/settings';

import { useScrollToTop } from '@minimals/hooks/use-scroll-to-top';

import { colors } from 'internal-ui/theme/core';
import { Snackbar } from 'internal-ui/components/snackbar';
import { MotionLazy } from 'internal-ui/components/animate';
import { ProgressBar } from 'internal-ui/components/progress-bar';
import {
  SettingsDrawer,
  SettingsProvider,
  SettingsConsumer,
} from 'internal-ui/components/settings';

import { Router } from 'src/routes/sections';

import { ThemeProvider } from 'src/theme';
import { CONFIG } from 'src/config-global';
import { LocalizationProvider } from 'src/locales';
import { I18nProvider } from 'src/locales/i18n-provider';
import { primaryPalette } from 'src/theme/primary-palette';

import { CheckoutProvider } from 'src/sections/checkout/context';

import { AuthProvider as JwtAuthProvider } from 'src/auth/context/jwt';
import { AuthProvider as Auth0AuthProvider } from 'src/auth/context/auth0';
import { AuthProvider as AmplifyAuthProvider } from 'src/auth/context/amplify';
import { AuthProvider as SupabaseAuthProvider } from 'src/auth/context/supabase';
import { AuthProvider as FirebaseAuthProvider } from 'src/auth/context/firebase';

// ----------------------------------------------------------------------

const AuthProvider =
  (CONFIG.auth.method === 'amplify' && AmplifyAuthProvider) ||
  (CONFIG.auth.method === 'firebase' && FirebaseAuthProvider) ||
  (CONFIG.auth.method === 'supabase' && SupabaseAuthProvider) ||
  (CONFIG.auth.method === 'auth0' && Auth0AuthProvider) ||
  JwtAuthProvider;

export const defaultSettings: SettingsState = {
  colorScheme: 'light',
  direction: 'ltr',
  contrast: 'default',
  navLayout: 'vertical',
  primaryColor: 'default',
  navColor: 'integrate',
  compactLayout: true,
  fontFamily: 'Public Sans Variable',
} as const;

export default function App() {
  useScrollToTop();

  return (
    <I18nProvider>
      <LocalizationProvider>
        <AuthProvider>
          <SettingsProvider settings={defaultSettings}>
            <SettingsConsumer>
              {(settings) => (
                <ThemeProvider defaultSettings={defaultSettings} settings={settings}>
                  <MotionLazy>
                    <CheckoutProvider>
                      <Snackbar />
                      <ProgressBar />
                      <SettingsDrawer
                        defaultSettings={defaultSettings}
                        settings={settings}
                        paletteOptions={[
                          { name: 'default', value: colors.primary.main },
                          { name: 'cyan', value: primaryPalette.cyan.main },
                          { name: 'purple', value: primaryPalette.purple.main },
                          { name: 'blue', value: primaryPalette.blue.main },
                          { name: 'orange', value: primaryPalette.orange.main },
                          { name: 'red', value: primaryPalette.red.main },
                        ]}
                      />
                      <Router />
                    </CheckoutProvider>
                  </MotionLazy>
                </ThemeProvider>
              )}
            </SettingsConsumer>
          </SettingsProvider>
        </AuthProvider>
      </LocalizationProvider>
    </I18nProvider>
  );
}
