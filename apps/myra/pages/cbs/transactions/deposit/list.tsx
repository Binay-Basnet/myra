import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { DepositList } from '@coop/cbs/transactions/deposit';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const TransactionsDepositList = () => <DepositList />;

TransactionsDepositList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsDepositList;
