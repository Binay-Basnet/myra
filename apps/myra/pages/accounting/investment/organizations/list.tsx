import { ReactElement } from 'react';

import { AccountingOrganizationList } from '@coop/accounting/ui-components';
import { AccountingLayout, InvestmentSidebarLayout } from '@coop/accounting/ui-layouts';

const InvestmentAccountListPage = () => <AccountingOrganizationList />;

InvestmentAccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <InvestmentSidebarLayout>{page}</InvestmentSidebarLayout>
    </AccountingLayout>
  );
};
export default InvestmentAccountListPage;
