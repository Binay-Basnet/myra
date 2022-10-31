import { ReactElement } from 'react';

import { AddInvestmentAccount } from '@coop/accounting/investment';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddInvestmentAccountPage = () => <AddInvestmentAccount />;

AddInvestmentAccountPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AddInvestmentAccountPage;
