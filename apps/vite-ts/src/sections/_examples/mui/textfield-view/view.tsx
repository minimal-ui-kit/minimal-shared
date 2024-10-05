import { CustomBreadcrumbs } from 'internal-ui/components/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { Textfields } from './textfield';
import { ComponentHero } from '../../component-hero';
import { ScrollToViewTemplate } from '../../component-template';

// ----------------------------------------------------------------------

export function TextfieldView() {
  const DEMO = [
    { name: 'Outlined', component: <Textfields variant="outlined" /> },
    { name: 'Filled', component: <Textfields variant="filled" /> },
    { name: 'Standard', component: <Textfields variant="standard" /> },
  ];

  return (
    <>
      <ComponentHero>
        <CustomBreadcrumbs
          heading="Textfield"
          links={[{ name: 'Components', href: paths.components }, { name: 'Textfield' }]}
          moreLink={['https://mui.com/components/text-fields']}
        />
      </ComponentHero>

      <ScrollToViewTemplate data={DEMO} />
    </>
  );
}
