import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { Section } from './section';
import { Main, Content } from './main';
import { HeaderSection } from '../core/header-section';
import { LayoutSection } from '../core/layout-section';

import type { HeaderSectionProps } from '../core/header-section';

// ----------------------------------------------------------------------

export type AuthSplitLayoutProps = {
  sx?: SxProps<Theme>;
  layoutQuery?: Breakpoint;
  children: React.ReactNode;
  footer?: React.ReactNode;
  header?: HeaderSectionProps;
  section?: {
    title?: string;
    imgUrl?: string;
    subtitle?: string;
  };
};

export function AuthSplitLayout({
  sx,
  section,
  children,
  footer,
  header,
  layoutQuery = 'md',
}: AuthSplitLayoutProps) {
  return (
    <LayoutSection
      headerSection={
        /** **************************************
         * Header
         *************************************** */
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
      sx={sx}
    >
      <Main layoutQuery={layoutQuery}>
        <Section
          layoutQuery={layoutQuery}
          title={section?.title}
          imgUrl={section?.imgUrl}
          subtitle={section?.subtitle}
        />
        <Content layoutQuery={layoutQuery}>{children}</Content>
      </Main>
    </LayoutSection>
  );
}
