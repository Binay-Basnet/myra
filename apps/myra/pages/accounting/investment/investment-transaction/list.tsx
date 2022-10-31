import { ReactElement } from 'react';

import { InvestmentTransactionList } from '@coop/accounting/investment';
import { AccountingLayout, InvestmentSidebarLayout } from '@coop/accounting/ui-layouts';

const InvestmentTransactionListPage = () => <InvestmentTransactionList />;

InvestmentTransactionListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <InvestmentSidebarLayout>{page}</InvestmentSidebarLayout>
    </AccountingLayout>
  );
};
export default InvestmentTransactionListPage;
