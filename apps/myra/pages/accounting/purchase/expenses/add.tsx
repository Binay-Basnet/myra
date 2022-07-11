import { ReactElement } from 'react';

import { AccountingFeaturePurchaseAddExpenses } from '@coop/accounting/purchase';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingExpensesAdd = () => {
  return <AccountingFeaturePurchaseAddExpenses />;
};

AccountingExpensesAdd.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingExpensesAdd;
