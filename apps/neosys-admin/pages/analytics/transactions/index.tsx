import { ReactElement } from 'react';

import { AnalyticsSiderbar, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const TransactionsList = () => <>Member ledger counter list</>;

TransactionsList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AnalyticsSiderbar>{page}</AnalyticsSiderbar>
    </MainLayout>
  );
};
export default TransactionsList;
