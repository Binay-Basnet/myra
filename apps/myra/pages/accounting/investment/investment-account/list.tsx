import { ReactElement } from 'react';

import { InvestmentAccountsList } from '@coop/accounting/investment';
import { AccountingLayout, InvestmentSidebarLayout } from '@coop/accounting/ui-layouts';

const InvestmentAccountListPage = () => <InvestmentAccountsList />;

InvestmentAccountListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <InvestmentSidebarLayout>{page}</InvestmentSidebarLayout>
    </AccountingLayout>
  );
};
export default InvestmentAccountListPage;
