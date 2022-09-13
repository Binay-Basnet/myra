import { ReactElement } from 'react';

import { AccountingFeatureQuickPaymentList } from '@coop/accounting/accounting';
import {
  AccountingLayout,
  AccountingSidebarLayout,
} from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <AccountingFeatureQuickPaymentList />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingQuickTransferList;
