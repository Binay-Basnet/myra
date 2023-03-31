import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AccountingFeatureAddQuickPayment } from '@coop/accounting/accounting';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickPaymentAdd = () => <AccountingFeatureAddQuickPayment />;

AccountingQuickPaymentAdd.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AccountingQuickPaymentAdd;
