import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AccountingFeaturePurchaseAddSupplierPayment } from '@coop/accounting/purchase';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseSupplierPayment = () => <AccountingFeaturePurchaseAddSupplierPayment />;

AccountingPurchaseSupplierPayment.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AccountingPurchaseSupplierPayment;
