import { ReactElement } from 'react';

import { AccountingFeaturePurchaseExpenses } from '@coop/accounting/purchase';
import { AccountingLayout, PurchaseLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseExpenses = () => {
  return <AccountingFeaturePurchaseExpenses />;
};

AccountingPurchaseExpenses.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <PurchaseLayout>{page}</PurchaseLayout>
    </AccountingLayout>
  );
};
export default AccountingPurchaseExpenses;
