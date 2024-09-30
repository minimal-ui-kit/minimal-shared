import type { AuthCenteredLayoutProps as LayoutProps } from 'private-ui/layouts/auth-centered';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { Logo } from 'private-ui/components/logo';
import { AuthCenteredLayout as Layout } from 'private-ui/layouts/auth-centered';

import { RouterLink } from 'src/routes/components';

import { SettingsButton } from '../components/settings-button';

// ----------------------------------------------------------------------

export function AuthCenteredLayout({ sx, children, header }: LayoutProps) {
  return (
    <Layout
      sx={sx}
      header={{
        ...header,
        slots: {
          ...header?.slots,
          topArea: (
            <Alert severity="info" sx={{ borderRadius: 0 }}>
              This is an info Alert.
            </Alert>
          ),
          leftArea: (
            <>
              {/* -- Logo -- */}
              <Logo />
            </>
          ),
          rightArea: (
            <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
              {/* -- Help link -- */}
              <Link
                href="#"
                component={RouterLink}
                color="inherit"
                sx={{ typography: 'subtitle2' }}
              >
                Need help?
              </Link>
              {/* -- Settings button -- */}
              <SettingsButton />
            </Box>
          ),
        },
      }}
    >
      {children}
    </Layout>
  );
}
