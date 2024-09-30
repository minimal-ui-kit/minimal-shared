import type { Breakpoint } from '@mui/material/styles';
import type { MainLayoutProps as LayoutProps } from 'private-ui/layouts/main';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';

import { useBoolean } from '@minimals/hooks/use-boolean';

import { Logo } from 'private-ui/components/logo';
import { MainLayout as Layout } from 'private-ui/layouts/main';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';

import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { Footer, HomeFooter } from './footer';
import { MenuButton } from '../components/menu-button';
import { navData as mainNavData } from '../config-nav-main';
import { SignInButton } from '../components/sign-in-button';
import { SettingsButton } from '../components/settings-button';

// ----------------------------------------------------------------------

export function MainLayout({ sx, children, header }: LayoutProps) {
  const theme = useTheme();

  const pathname = usePathname();

  const mobileNavOpen = useBoolean();

  const homePage = pathname === '/';

  const layoutQuery: Breakpoint = 'md';

  const navData = mainNavData;

  return (
    <Layout
      sx={sx}
      /** **************************************
       * Header
       *************************************** */
      header={{
        ...header,
        slots: {
          ...header?.slots,
          topArea: (
            <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
              This is an info Alert.
            </Alert>
          ),
          leftArea: (
            <>
              {/* -- Nav mobile -- */}
              <MenuButton
                onClick={mobileNavOpen.onTrue}
                sx={{
                  mr: 1,
                  ml: -1,
                  [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                }}
              />
              <NavMobile
                data={navData}
                open={mobileNavOpen.value}
                onClose={mobileNavOpen.onFalse}
                slots={{
                  bottomArea: (
                    <Box gap={1.5} display="flex" sx={{ px: 2.5, py: 3 }}>
                      <SignInButton fullWidth />
                      <Button
                        fullWidth
                        variant="contained"
                        rel="noopener"
                        target="_blank"
                        href={paths.minimalStore}
                      >
                        Purchase
                      </Button>
                    </Box>
                  ),
                }}
              />
              {/* -- Logo -- */}
              <Logo />
            </>
          ),
          rightArea: (
            <>
              {/* -- Nav desktop -- */}
              <NavDesktop
                data={navData}
                sx={{
                  display: 'none',
                  [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
                }}
              />
              <Box display="flex" alignItems="center" gap={{ xs: 1, sm: 1.5 }}>
                {/* -- Settings button -- */}
                <SettingsButton />
                {/* -- Sign in button -- */}
                <SignInButton />
                {/* -- Purchase button -- */}
                <Button
                  variant="contained"
                  rel="noopener"
                  target="_blank"
                  href={paths.minimalStore}
                  sx={{
                    display: 'none',
                    [theme.breakpoints.up(layoutQuery)]: { display: 'inline-flex' },
                  }}
                >
                  Purchase
                </Button>
              </Box>
            </>
          ),
        },
      }}
      footer={homePage ? <HomeFooter /> : <Footer layoutQuery={layoutQuery} />}
    >
      {children}
    </Layout>
  );
}
