import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AllHoldingAccountsList } from '@coop/cbs/transactions/all-accounts';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const AllHoldingAccList = () => (
  <>
    <TransactionPageHeader heading="All Holding Accounts" />
    <AllHoldingAccountsList />
  </>
);

AllHoldingAccList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default AllHoldingAccList;
