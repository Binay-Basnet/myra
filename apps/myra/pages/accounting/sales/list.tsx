import { ReactElement } from 'react';

import { AccountingFeaturePurchase } from '@coop/accounting/purchase';
import { AccountingLayout, SalesLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseList = () => {
  return <div>hello</div>;
};

AccountingPurchaseList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <SalesLayout>{page}</SalesLayout>
    </AccountingLayout>
  );
};
export default AccountingPurchaseList;
