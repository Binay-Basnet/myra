import { ReactElement } from 'react';

import { CustomerList } from '@coop/accounting/sales';
import { AccountingLayout, SalesLayout } from '@coop/accounting/ui-layouts';

const CustomerListPage = () => <CustomerList />;

CustomerListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <SalesLayout>{page}</SalesLayout>
    </AccountingLayout>
  );
};
export default CustomerListPage;
