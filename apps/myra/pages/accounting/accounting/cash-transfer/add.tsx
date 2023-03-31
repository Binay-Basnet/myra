import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AccountingFeatureAddCashTransfer } from '@coop/accounting/accounting';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingCashTransferAdd = () => <AccountingFeatureAddCashTransfer />;

AccountingCashTransferAdd.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AccountingCashTransferAdd;
