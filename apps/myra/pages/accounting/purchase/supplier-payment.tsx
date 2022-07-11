import { ReactElement } from 'react';

import { AccountingFeaturePurchaseSupplierPayment } from '@coop/accounting/purchase';
import { AccountingLayout, PurchaseLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseSupplierNote = () => {
  return <AccountingFeaturePurchaseSupplierPayment />;
};

AccountingPurchaseSupplierNote.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AccountingLayout>
      <PurchaseLayout>{page}</PurchaseLayout>
    </AccountingLayout>
  );
};
export default AccountingPurchaseSupplierNote;
