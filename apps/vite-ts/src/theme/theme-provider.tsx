import { useSettingsContext } from 'private-ui/components/settings';
import { ThemeProvider as Provider } from 'private-ui/theme/theme-provider';

import { useTranslate } from 'src/locales';

import { primaryPalette } from './primary-palette';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function ThemeProvider({ children }: Props) {
  const { currentLang } = useTranslate();

  const settings = useSettingsContext();

  return (
    <Provider
      settings={settings}
      localeComponents={currentLang?.systemValue}
      primaryPalette={primaryPalette}
    >
      {children}
    </Provider>
  );
}
