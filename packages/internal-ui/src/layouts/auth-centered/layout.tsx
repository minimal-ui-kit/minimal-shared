import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { Main } from './main';
import { stylesMode } from '../../theme/styles';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';

import type { HeaderSectionProps } from '../core/header-section';

// ----------------------------------------------------------------------

export type AuthCenteredLayoutProps = {
  sx?: SxProps<Theme>;
  layoutQuery?: Breakpoint;
  footer?: React.ReactNode;
  children: React.ReactNode;
  header?: HeaderSectionProps;
};

export function AuthCenteredLayout({
  sx,
  header,
  footer,
  children,
  layoutQuery = 'md',
}: AuthCenteredLayoutProps) {
  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          disableElevation
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
          sx={{ position: { [layoutQuery]: 'fixed' }, ...header?.sx }}
          {...header}
        />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={footer}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '420px' }}
      sx={{
        '&::before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          opacity: 0.24,
          position: 'fixed',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: `url(/assets/background/background-3-blur.webp)`,
          [stylesMode.dark]: { opacity: 0.08 },
        },
        ...sx,
      }}
    >
      <Main layoutQuery={layoutQuery}>{children}</Main>
    </LayoutSection>
  );
}
