import { ReactElement } from 'react';

import { AccountingOrganizationList } from '@coop/accounting/ui-components';
import { AccountingLayout, ExternalLoanSidebarLayout } from '@coop/accounting/ui-layouts';

const InvestmentAccountListPage = () => <AccountingOrganizationList />;

InvestmentAccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <ExternalLoanSidebarLayout>{page}</ExternalLoanSidebarLayout>
    </AccountingLayout>
  );
};
export default InvestmentAccountListPage;
