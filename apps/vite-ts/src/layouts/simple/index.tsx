import type { SimpleLayoutProps as LayoutProps } from 'private-ui/layouts/simple';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';

import { Logo } from 'private-ui/components/logo';
import { SimpleLayout as Layout } from 'private-ui/layouts/simple';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { SettingsButton } from '../components/settings-button';

// ----------------------------------------------------------------------

export function SimpleLayout({ sx, children, header, content }: LayoutProps) {
  return (
    <Layout
      sx={sx}
      header={{
        ...header,
        slots: {
          ...header?.slots,
          topArea: (
            <Alert severity="success" sx={{ borderRadius: 0 }}>
              This is an info Alert.
            </Alert>
          ),
          leftArea: <Logo />,
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
      content={content}
    >
      {children}
    </Layout>
  );
}
