import { ReactElement } from 'react';
import { TransactionList } from '@neosys/feature-analytics';

import { AnalyticsSiderbar, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const TransactionsListPage = () => <TransactionList />;

TransactionsListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AnalyticsSiderbar>{page}</AnalyticsSiderbar>
    </MainLayout>
  );
};
export default TransactionsListPage;
