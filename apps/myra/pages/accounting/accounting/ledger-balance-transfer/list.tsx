import { ReactElement } from 'react';

import { AccountingFeatureLedgerBalanceTransferList } from '@coop/accounting/accounting';
import { AccountingLayout, AccountingSidebarLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingLedgerBalanceTransferList = () => <AccountingFeatureLedgerBalanceTransferList />;

AccountingLedgerBalanceTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingLedgerBalanceTransferList;
