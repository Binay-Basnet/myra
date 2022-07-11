import { ReactElement } from 'react';

import { AccountingFeaturePurchase } from '@coop/accounting/purchase';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseList = () => {
  return <AccountingFeaturePurchase />;
};

AccountingPurchaseList.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingPurchaseList;
