import { ReactElement } from 'react';

import { AccountingPurchaseExpensesDetails } from '@coop/accounting/purchase';
import { AccountingLayout, PurchaseLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseExpensesDetailsPage = () => <AccountingPurchaseExpensesDetails />;

AccountingPurchaseExpensesDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <PurchaseLayout>{page}</PurchaseLayout>
    </AccountingLayout>
  );
};
export default AccountingPurchaseExpensesDetailsPage;
