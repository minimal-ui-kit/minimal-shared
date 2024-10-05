import type { IInvoice } from 'src/types/invoice';

import { CustomBreadcrumbs } from 'internal-ui/components/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { InvoiceNewEditForm } from '../invoice-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  invoice?: IInvoice;
};

export function InvoiceEditView({ invoice }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Invoice', href: paths.dashboard.invoice.root },
          { name: invoice?.invoiceNumber },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InvoiceNewEditForm currentInvoice={invoice} />
    </DashboardContent>
  );
}
