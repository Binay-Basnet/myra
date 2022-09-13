import { ReactElement } from 'react';

import { AccountingFeatureAddBankAccount } from '@coop/accounting/accounting';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingBankAccountsAdd = () => <AccountingFeatureAddBankAccount />;

AccountingBankAccountsAdd.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingBankAccountsAdd;
