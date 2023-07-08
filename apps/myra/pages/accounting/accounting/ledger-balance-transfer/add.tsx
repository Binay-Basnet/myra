import { ReactElement } from 'react';

import { AccountingFeatureAddLedgerBalanceTransfer } from '@coop/accounting/accounting';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AccountingLedgerBalanceTransferAdd = () => <AccountingFeatureAddLedgerBalanceTransfer />;

AccountingLedgerBalanceTransferAdd.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingLedgerBalanceTransferAdd;
