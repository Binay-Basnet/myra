import { ReactElement } from 'react';

import { AccountingFeatureAddCashTransfer } from '@coop/accounting/accounting';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingCashTransferAdd = () => {
  return <AccountingFeatureAddCashTransfer />;
};

AccountingCashTransferAdd.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingCashTransferAdd;
