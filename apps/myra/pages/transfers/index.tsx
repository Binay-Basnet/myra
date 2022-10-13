import { ReactElement } from 'react';

import { DepositList } from '@coop/cbs/transactions/deposit';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const Transfers = () => <DepositList />;

Transfers.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default Transfers;
