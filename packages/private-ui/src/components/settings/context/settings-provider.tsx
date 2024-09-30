import { isEqual } from 'es-toolkit';
import { useMemo, useState, useCallback, createContext } from 'react';

import { useLocalStorage } from '@minimals/hooks/use-local-storage';

import type { SettingsState, SettingsContextValue, SettingsProviderProps } from '../types';

// ----------------------------------------------------------------------

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const SettingsConsumer = SettingsContext.Consumer;

// ----------------------------------------------------------------------

export function SettingsProvider({
  children,
  settings,
  storageKey = 'app-settings',
}: SettingsProviderProps) {
  const values = useLocalStorage<SettingsState>(storageKey, settings);

  const [openDrawer, setOpenDrawer] = useState(false);

  const onToggleDrawer = useCallback(() => {
    setOpenDrawer((prev) => !prev);
  }, []);

  const onCloseDrawer = useCallback(() => {
    setOpenDrawer(false);
  }, []);

  const canReset = isEqual(values.state, settings);

  const memoizedValue = useMemo(
    () => ({
      ...values.state,
      canReset,
      onReset: values.resetState,
      onUpdate: values.setState,
      onUpdateField: values.setField,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
    }),
    [
      values.state,
      values.setField,
      values.setState,
      values.resetState,
      canReset,
      openDrawer,
      onCloseDrawer,
      onToggleDrawer,
    ]
  );

  return <SettingsContext.Provider value={memoizedValue}>{children}</SettingsContext.Provider>;
}
