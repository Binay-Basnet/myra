import { ReactElement } from 'react';

import { AccountingFeaturePurchaseList } from '@coop/accounting/purchase';
import { AccountingLayout, PurchaseLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseList = () => {
  return <AccountingFeaturePurchaseList />;
};

AccountingPurchaseList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <PurchaseLayout>{page}</PurchaseLayout>
    </AccountingLayout>
  );
};
export default AccountingPurchaseList;
