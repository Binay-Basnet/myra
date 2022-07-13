import { ReactElement } from 'react';

import { AccountingFeatureAddQuickPayment } from '@coop/accounting/accounting';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickPaymentAdd = () => {
  return <AccountingFeatureAddQuickPayment />;
};

AccountingQuickPaymentAdd.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingQuickPaymentAdd;
