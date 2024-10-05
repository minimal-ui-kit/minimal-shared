import type { ITourItem } from 'src/types/tour';

import { CustomBreadcrumbs } from 'internal-ui/components/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { TourNewEditForm } from '../tour-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  tour?: ITourItem;
};

export function TourEditView({ tour }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Tour', href: paths.dashboard.tour.root },
          { name: tour?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <TourNewEditForm currentTour={tour} />
    </DashboardContent>
  );
}
