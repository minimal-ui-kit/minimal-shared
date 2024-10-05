import { useMemo } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { useTheme, useColorScheme } from '@mui/material/styles';

import { isPresent } from '../utils';
import { Iconify } from '../../iconify';
import { BaseOption } from './base-option';
import { NavOptions } from './nav-options';
import { Scrollbar } from '../../scrollbar';
import { FontOptions } from './font-options';
import { PresetsOptions } from './presets-options';
import icMoon from '../../../static/icons/ic-moon.svg';
import icFont from '../../../static/icons/ic-font.svg';
import { FullScreenButton } from './fullscreen-button';
import { paper, varAlpha } from '../../../theme/styles';
import { defaultFont } from '../../../theme/core/typography';
import icContrast from '../../../static/icons/ic-contrast.svg';
import icAlignRight from '../../../static/icons/ic-align-right.svg';
import icAutofitWidth from '../../../static/icons/ic-autofit-width.svg';
import icSidebarFilled from '../../../static/icons/ic-sidebar-filled.svg';
import icSidebarOutline from '../../../static/icons/ic-sidebar-outline.svg';
import icSiderbarDuotone from '../../../static/icons/ic-siderbar-duotone.svg';

import type { SettingsDrawerProps } from '../types';

// ----------------------------------------------------------------------

export function SettingsDrawer({
  sx,
  settings,
  paletteOptions,
  defaultSettings,
}: SettingsDrawerProps) {
  const theme = useTheme();

  const { mode, setMode } = useColorScheme();

  const displayOptions = useMemo(
    () => ({
      colorScheme: isPresent(defaultSettings, 'colorScheme'),
      contrast: isPresent(defaultSettings, 'contrast'),
      direction: isPresent(defaultSettings, 'direction'),
      compactLayout: isPresent(defaultSettings, 'compactLayout'),
      presets: isPresent(defaultSettings, 'primaryColor'),
      navColor: isPresent(defaultSettings, 'navColor'),
      navLayout: isPresent(defaultSettings, 'navLayout'),
      fontFamily: isPresent(defaultSettings, 'fontFamily'),
    }),
    [defaultSettings]
  );

  const renderHead = (
    <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Settings
      </Typography>

      <FullScreenButton />

      <Tooltip title="Reset">
        <IconButton
          onClick={() => {
            settings?.onReset();
            setMode(defaultSettings.colorScheme as any);
          }}
        >
          <Badge color="error" variant="dot" invisible={!settings?.canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <Tooltip title="Close">
        <IconButton onClick={settings?.onCloseDrawer}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  const renderMode = displayOptions.colorScheme && (
    <BaseOption
      label="Dark mode"
      icon={icMoon}
      selected={settings?.colorScheme === 'dark'}
      onClick={() => {
        settings?.onUpdateField('colorScheme', mode === 'light' ? 'dark' : 'light');
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    />
  );

  const renderContrast = displayOptions.contrast && (
    <BaseOption
      label="Contrast"
      icon={icContrast}
      selected={settings?.contrast === 'hight'}
      onClick={() =>
        settings?.onUpdateField('contrast', settings?.contrast === 'default' ? 'hight' : 'default')
      }
    />
  );

  const renderRTL = displayOptions.direction && (
    <BaseOption
      label="Right to left"
      icon={icAlignRight}
      selected={settings?.direction === 'rtl'}
      onClick={() =>
        settings?.onUpdateField('direction', settings?.direction === 'ltr' ? 'rtl' : 'ltr')
      }
    />
  );

  const renderCompact = displayOptions.compactLayout && (
    <BaseOption
      tooltip="Dashboard only and available at large resolutions > 1600px (xl)"
      label="Compact"
      icon={icAutofitWidth}
      selected={displayOptions.compactLayout && Boolean(settings?.compactLayout)}
      onClick={() => settings?.onUpdateField('compactLayout', !settings?.compactLayout)}
    />
  );

  const renderPresets = displayOptions.presets && (
    <PresetsOptions
      icon={icSiderbarDuotone}
      value={settings?.primaryColor}
      onClickOption={(newValue) => settings?.onUpdateField('primaryColor', newValue)}
      options={paletteOptions}
    />
  );

  const renderNav = (displayOptions.navColor || displayOptions.navLayout) && (
    <NavOptions
      value={{
        color: settings?.navColor,
        layout: settings?.navLayout,
      }}
      onClickOption={{
        color: (newValue) => settings?.onUpdateField('navColor', newValue),
        layout: (newValue) => settings?.onUpdateField('navLayout', newValue),
      }}
      options={{
        layouts: ['vertical', 'horizontal', 'mini'],
        colors: [
          { value: 'integrate', icon: icSidebarOutline },
          { value: 'apparent', icon: icSidebarFilled },
        ],
      }}
      hideNavColor={!displayOptions.navColor}
      hideNavLayout={!displayOptions.navLayout}
    />
  );

  const renderFont = displayOptions.fontFamily && (
    <FontOptions
      icon={icFont}
      value={settings?.fontFamily ?? defaultFont}
      onClickOption={(newValue) => settings?.onUpdateField('fontFamily', newValue)}
      options={[defaultFont, 'Inter Variable', 'DM Sans Variable', 'Nunito Sans Variable']}
    />
  );

  return (
    <Drawer
      anchor="right"
      open={settings?.openDrawer}
      onClose={settings?.onCloseDrawer}
      slotProps={{ backdrop: { invisible: true } }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({
            theme,
            color: varAlpha(theme.vars.palette.background.defaultChannel, 0.9),
          }),
          width: 360,
          ...sx,
        },
      }}
    >
      {renderHead}

      <Scrollbar>
        <Stack spacing={6} sx={{ px: 2.5, pb: 5 }}>
          <Box gap={2} display="grid" gridTemplateColumns="repeat(2, 1fr)">
            {renderMode}
            {renderContrast}
            {renderRTL}
            {renderCompact}
          </Box>
          {renderNav}
          {renderPresets}
          {renderFont}
        </Stack>
      </Scrollbar>
    </Drawer>
  );
}
