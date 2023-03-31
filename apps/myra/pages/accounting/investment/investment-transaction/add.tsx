import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AddInvestmentTransaction } from '@coop/accounting/investment';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddInvestmentTransactionPage = () => <AddInvestmentTransaction />;

AddInvestmentTransactionPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AddInvestmentTransactionPage;
