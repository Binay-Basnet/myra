import { ReactElement } from 'react';

import { AddInvestment } from '@coop/accounting/investment';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddInvestmentPage = () => <AddInvestment />;

AddInvestmentPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AddInvestmentPage;
