import { ReactElement } from 'react';

import { AddInvestmentTransaction } from '@coop/accounting/investment';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddInvestmentTransactionPage = () => <AddInvestmentTransaction />;

AddInvestmentTransactionPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AddInvestmentTransactionPage;
