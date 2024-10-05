'use client';

// import type { ButtonProps } from '@minimals/shared/components/button';

import Box from '@mui/material/Box';

import { toast, Snackbar } from 'internal-ui/components/snackbar';

// import { FlagIcon, FlagIconProps } from 'internal-ui/components/flag-icon';
import { Iconify } from 'internal-ui/components/iconify';
// import { add, subtract } from '@minimals/mock/test';
import { primary, varAlpha } from 'internal-ui/theme';

// import { useToggle } from 'internal-ui/hooks/useToggle';
// import { useBoolean } from 'internal-ui/hooks/use-boolean';

// import { useBoolean as useBoolean2 } from '@repo/sourcemap-ui/hooks/use-boolean';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

export function AppView() {
  // const boolean1 = useBoolean();

  const theme = useTheme();
  // const boolean2 = useBoolean2();

  console.log('primary', primary.lightChannel);

  return (
    <>
      <Snackbar />

      <div
        style={{
          gap: '4rem',
          padding: '4rem',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1>
          {/* <FlagIcon code="gb" /> */}
          Vite.js 123
        </h1>

        <div>primary.lightChannel: {primary.lightChannel}</div>

        <Card sx={{ p: 10 }}>Snackbar </Card>

        <Button
          variant="contained"
          color="success"
          onClick={() => toast.success('This is an success')}
        >
          Success
        </Button>

        <Paper>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Iconify
          </Typography>
          <Iconify icon="eva:color-palette-fill" width={32} sx={{ color: 'action.active' }} />
          <Iconify icon="eva:color-palette-fill" width={32} sx={{ color: 'action.disabled' }} />
          <Iconify icon="eva:color-palette-fill" width={32} sx={{ color: 'primary.main' }} />
          <Iconify icon="eva:color-palette-fill" width={32} sx={{ color: 'secondary.main' }} />
          <Iconify icon="eva:color-palette-fill" width={32} sx={{ color: 'info.main' }} />
          <Iconify icon="eva:color-palette-fill" width={32} sx={{ color: 'success.main' }} />
          <Iconify icon="eva:color-palette-fill" width={32} sx={{ color: 'warning.main' }} />
          <Iconify icon="eva:color-palette-fill" width={32} sx={{ color: 'error.main' }} />
        </Paper>

        <Paper
          variant="outlined"
          sx={{
            p: 5,
            color: 'secondary.main',
            bgcolor: varAlpha(theme.vars.palette.primary.lightChannel, 0.24),
          }}
        >
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: theme.palette.primary.lighter,
              fontFamily: theme.typography.fontSecondaryFamily,
              fontWeight: theme.typography.fontWeightSemiBold,
            }}
          >
            Chips
          </Typography>
          <Box display="flex" gap={5}>
            <Chip label="Primary" color="primary" />
            <Chip label="Secondary" color="secondary" />
            <Chip label="Info" color="info" />
            <Chip label="Success" color="success" />
            <Chip label="Warning" color="warning" />
            <Chip label="Error" color="error" />
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 5 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Buttons
          </Typography>
          <Box display="flex" gap={5}>
            <Button variant="contained" color="primary">
              Primary
            </Button>
            <Button variant="contained" color="secondary">
              Secondary
            </Button>
            <Button variant="contained" color="info">
              Info
            </Button>
            <Button variant="contained" color="success">
              Success
            </Button>
            <Button variant="contained" color="warning">
              Warning
            </Button>
            <Button variant="contained" color="error">
              Error
            </Button>
          </Box>
        </Paper>

        <Paper variant="outlined" sx={{ p: 5 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Buttons
          </Typography>
          <Box display="flex" gap={5}>
            <Button variant="soft" color="primary">
              Primary
            </Button>
            <Button variant="soft" color="secondary">
              Secondary
            </Button>
            <Button variant="soft" color="info">
              Info
            </Button>
            <Button variant="soft" color="success">
              Success
            </Button>
            <Button variant="soft" color="warning">
              Warning
            </Button>
            <Button variant="soft" color="error">
              Error
            </Button>
          </Box>
        </Paper>

        {/* {JSON.stringify(boolean1.value)} */}

        {/* <h2>add:{add(11, 2)}</h2>
        <h2>subtract:{subtract(1, 2)}</h2> */}
      </div>
    </>
  );
}
