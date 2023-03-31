import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AddInvestmentAccount } from '@coop/accounting/investment';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddInvestmentAccountPage = () => <AddInvestmentAccount />;

AddInvestmentAccountPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AddInvestmentAccountPage;
