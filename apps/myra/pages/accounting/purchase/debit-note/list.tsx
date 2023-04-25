import { ReactElement } from 'react';

import { AccountingFeaturePurchaseDebitNote } from '@coop/accounting/purchase';
import { AccountingLayout, PurchaseLayout } from '@coop/accounting/ui-layouts';

const AccountingPurchaseDebitNote = () => <AccountingFeaturePurchaseDebitNote />;

AccountingPurchaseDebitNote.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <PurchaseLayout>{page}</PurchaseLayout>
    </AccountingLayout>
  );
};
export default AccountingPurchaseDebitNote;
