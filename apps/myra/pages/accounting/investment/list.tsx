import { ReactElement } from 'react';

import { InvestmentList } from '@coop/accounting/investment';
import { AccountingLayout, InvestmentSidebarLayout } from '@coop/accounting/ui-layouts';

const InvestmentListPage = () => <InvestmentList />;

InvestmentListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <InvestmentSidebarLayout>{page}</InvestmentSidebarLayout>
    </AccountingLayout>
  );
};
export default InvestmentListPage;
