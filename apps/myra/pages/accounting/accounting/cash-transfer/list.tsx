import { ReactElement } from 'react';

import { AccountingFeatureCashTransferList } from '@coop/accounting/accounting';
import {
  AccountingLayout,
  AccountingSidebarLayout,
} from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingCashTransferList = () => <AccountingFeatureCashTransferList />;

AccountingCashTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingCashTransferList;
