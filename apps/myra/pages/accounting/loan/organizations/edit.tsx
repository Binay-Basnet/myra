import { ReactElement } from 'react';

import { AddAccountingOrganization } from '@coop/accounting/ui-components';
import { AccountingLayout, ExternalLoanSidebarLayout } from '@coop/accounting/ui-layouts';

const AddInvestmentAccountPage = () => <AddAccountingOrganization />;

AddInvestmentAccountPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <ExternalLoanSidebarLayout>{page}</ExternalLoanSidebarLayout>
    </AccountingLayout>
  );
};
export default AddInvestmentAccountPage;
