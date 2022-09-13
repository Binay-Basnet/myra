import { ReactElement } from 'react';

import { SalesObject } from '@coop/accounting/sales';
import { AccountingLayout, SalesLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingSalesListPage = () =>
   <SalesObject />
  //   <AccountingSalesList />;
;

AccountingSalesListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <SalesLayout>{page}</SalesLayout>
    </AccountingLayout>
  );
};
export default AccountingSalesListPage;
