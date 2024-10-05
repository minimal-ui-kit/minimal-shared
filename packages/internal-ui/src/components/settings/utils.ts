import type { SettingsState } from './types';

// ----------------------------------------------------------------------

export function isPresent(defaultSettings?: SettingsState, option?: keyof SettingsState): boolean {
  if (!defaultSettings || !option) {
    return false;
  }

  return Object.prototype.hasOwnProperty.call(defaultSettings, option);
}
