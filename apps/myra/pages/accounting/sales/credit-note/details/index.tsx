import { ReactElement } from 'react';

import { AccountingCreditNoteDetails } from '@coop/accounting/sales';
import { AccountingLayout, SalesLayout } from '@coop/accounting/ui-layouts';

const AccountingSalesListPage = () => <AccountingCreditNoteDetails />;

AccountingSalesListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <SalesLayout>{page}</SalesLayout>
    </AccountingLayout>
  );
};
export default AccountingSalesListPage;
