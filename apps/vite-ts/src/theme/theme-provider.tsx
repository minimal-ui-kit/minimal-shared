/* eslint-disable import/no-duplicates */
import type { SettingsState, SettingsContextValue } from 'internal-ui/components/settings';

import { createPaletteChannel } from 'internal-ui/theme/styles';
import { ThemeProvider as Provider } from 'internal-ui/theme/theme-provider';

import { useTranslate } from 'src/locales';

import { primaryPalette } from './primary-palette';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
  defaultSettings: SettingsState;
  settings: SettingsContextValue;
};

export function ThemeProvider({ children, defaultSettings, settings }: Props) {
  const { currentLang } = useTranslate();

  return (
    <Provider
      settings={settings}
      defaultSettings={defaultSettings}
      localeComponents={currentLang?.systemValue}
      primaryPalette={primaryPalette}
      overridesTheme={{
        colorSchemes: {
          light: {
            palette: {
              primary: createPaletteChannel({
                lighter: '#F2FBCF',
                light: '#C7EC6D',
                main: '#82C115',
                dark: '#528A0A',
                darker: '#2E5C04',
                contrastText: '#FFFFFF',
              }),
            },
          },
          dark: {
            palette: {
              primary: createPaletteChannel({
                lighter: '#F2FBCF',
                light: '#C7EC6D',
                main: '#82C115',
                dark: '#528A0A',
                darker: '#2E5C04',
                contrastText: '#FFFFFF',
              }),
            },
          },
        },
        shape: { borderRadius: 4 },
      }}
    >
      {children}
    </Provider>
  );
}
