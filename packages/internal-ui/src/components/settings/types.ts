import type { Theme, SxProps } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type SettingsState = {
  fontFamily?: string;
  compactLayout?: boolean;
  direction?: 'ltr' | 'rtl';
  colorScheme?: 'light' | 'dark';
  contrast?: 'default' | 'hight';
  navColor?: 'integrate' | 'apparent';
  navLayout?: 'vertical' | 'horizontal' | 'mini';
  primaryColor?: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
};

export type SettingsContextValue = SettingsState & {
  canReset: boolean;
  onReset: () => void;
  onUpdate: (updateValue: Partial<SettingsState>) => void;
  onUpdateField: (
    name: keyof SettingsState,
    updateValue: SettingsState[keyof SettingsState]
  ) => void;
  // Drawer
  openDrawer: boolean;
  onCloseDrawer: () => void;
  onToggleDrawer: () => void;
};

export type SettingsProviderProps = {
  settings: SettingsState;
  children: React.ReactNode;
  storageKey?: string;
};

export type SettingsDrawerProps = {
  sx?: SxProps<Theme>;
  settings?: SettingsContextValue;
  defaultSettings: SettingsState;
  paletteOptions: { name: SettingsState['primaryColor']; value: string }[];
};
