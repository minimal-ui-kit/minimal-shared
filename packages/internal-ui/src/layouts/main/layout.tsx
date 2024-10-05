import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { Main } from './main';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';

import type { HeaderSectionProps } from '../core/header-section';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  layoutQuery?: Breakpoint;
  footer?: React.ReactNode;
  header?: HeaderSectionProps;
};

export function MainLayout({ sx, children, header, footer, layoutQuery = 'md' }: MainLayoutProps) {
  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={<HeaderSection layoutQuery={layoutQuery} {...header} />}
      /** **************************************
       * Footer
       *************************************** */
      footerSection={footer}
      /** **************************************
       * Style
       *************************************** */
      sx={sx}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
