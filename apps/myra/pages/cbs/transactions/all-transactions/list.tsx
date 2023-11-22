import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AllTransactionsList } from '@coop/cbs/transactions/deposit';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const AllTransactionList = () => <AllTransactionsList />;

AllTransactionList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default AllTransactionList;
