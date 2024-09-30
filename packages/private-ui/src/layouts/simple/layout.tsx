import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { Main, CompactContent } from './main';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';

import type { HeaderSectionProps } from '../core/header-section';

// ----------------------------------------------------------------------

export type SimpleLayoutProps = {
  sx?: SxProps<Theme>;
  layoutQuery?: Breakpoint;
  footer?: React.ReactNode;
  children: React.ReactNode;
  header?: HeaderSectionProps;
  content?: {
    compact?: boolean;
  };
};

export function SimpleLayout({
  sx,
  children,
  header,
  footer,
  content,
  layoutQuery = 'md',
}: SimpleLayoutProps) {
  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{ container: { maxWidth: false } }}
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
      cssVars={{
        '--layout-simple-content-compact-width': '448px',
      }}
      sx={sx}
    >
      <Main>
        {content?.compact ? (
          <CompactContent layoutQuery={layoutQuery}>{children}</CompactContent>
        ) : (
          children
        )}
      </Main>
    </LayoutSection>
  );
}
