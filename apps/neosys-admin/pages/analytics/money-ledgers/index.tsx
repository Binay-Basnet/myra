import { ReactElement } from 'react';
import { MoneyLedgerList } from '@neosys/feature-analytics';

import { AnalyticsSiderbar, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const MoneyLedgersList = () => <MoneyLedgerList />;

MoneyLedgersList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AnalyticsSiderbar>{page}</AnalyticsSiderbar>
    </MainLayout>
  );
};
export default MoneyLedgersList;
