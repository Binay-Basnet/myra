import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AddInvestment } from '@coop/accounting/investment';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddInvestmentPage = () => <AddInvestment />;

AddInvestmentPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AddInvestmentPage;
