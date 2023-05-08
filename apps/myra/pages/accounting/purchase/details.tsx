import { ReactElement } from 'react';

import { AccountingPurchaseEntryDetails } from '@coop/accounting/purchase';
import { AccountingLayout, PurchaseLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseListDetails = () => <AccountingPurchaseEntryDetails />;

AccountingPurchaseListDetails.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <PurchaseLayout>{page}</PurchaseLayout>
    </AccountingLayout>
  );
};
export default AccountingPurchaseListDetails;
