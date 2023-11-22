import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AllTransactionDetails } from '@coop/cbs/transactions/deposit';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const AllTrasactionDetailsPage = () => <AllTransactionDetails />;

AllTrasactionDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};

export default AllTrasactionDetailsPage;
