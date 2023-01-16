import { ReactElement } from 'react';
import { AllTransactionsList } from 'libs/cbs/transactions/feature-deposit/src/components';

import { MainLayout } from '@myra-ui';

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
