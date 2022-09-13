import { ReactElement } from 'react';

import { AccountingFeaturePurchaseAddSupplierPayment } from '@coop/accounting/purchase';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingPurchaseSupplierPayment = () => <AccountingFeaturePurchaseAddSupplierPayment />;

AccountingPurchaseSupplierPayment.getLayout = function getLayout(
  page: ReactElement
) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingPurchaseSupplierPayment;
