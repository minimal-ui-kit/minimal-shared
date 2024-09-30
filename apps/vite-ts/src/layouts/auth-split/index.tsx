import type { AuthSplitLayoutProps as LayoutProps } from 'private-ui/layouts/auth-split';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { Logo } from 'private-ui/components/logo';
import { AuthSplitLayout as Layout } from 'private-ui/layouts/auth-split';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { SettingsButton } from '../components/settings-button';

// ----------------------------------------------------------------------

export function AuthSplitLayout({ sx, section, children, header }: LayoutProps) {
  return (
    <Layout
      sx={sx}
      header={{
        ...header,
        slots: {
          ...header?.slots,
          topArea: (
            <Alert severity="warning" sx={{ borderRadius: 0 }}>
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
                href={paths.faqs}
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
      section={section}
    >
      {children}
    </Layout>
  );
}
