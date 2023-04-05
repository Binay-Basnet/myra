import { ReactElement } from 'react';

import { Scrollable } from '@myra-ui';

import { AddAccountingOrganization } from '@coop/accounting/ui-components';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const AddInvestmentAccountPage = () => <AddAccountingOrganization />;

AddInvestmentAccountPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <Scrollable>{page}</Scrollable>
    </AccountingLayout>
  );
};
export default AddInvestmentAccountPage;
