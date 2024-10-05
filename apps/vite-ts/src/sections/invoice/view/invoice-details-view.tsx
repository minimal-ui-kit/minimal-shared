import type { IInvoice } from 'src/types/invoice';

import { CustomBreadcrumbs } from 'internal-ui/components/custom-breadcrumbs';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { InvoiceDetails } from '../invoice-details';

// ----------------------------------------------------------------------

type Props = {
  invoice?: IInvoice;
};

export function InvoiceDetailsView({ invoice }: Props) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading={invoice?.invoiceNumber}
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Invoice', href: paths.dashboard.invoice.root },
          { name: invoice?.invoiceNumber },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InvoiceDetails invoice={invoice} />
    </DashboardContent>
  );
}
