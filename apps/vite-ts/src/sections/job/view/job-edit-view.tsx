import type { IJobItem } from 'src/types/job';

import { CustomBreadcrumbs } from 'internal-ui/components/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { JobNewEditForm } from '../job-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  job?: IJobItem;
};

export function JobEditView({ job }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Job', href: paths.dashboard.job.root },
          { name: job?.title },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <JobNewEditForm currentJob={job} />
    </DashboardContent>
  );
}
