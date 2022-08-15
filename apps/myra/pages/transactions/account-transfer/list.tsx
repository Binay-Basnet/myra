import React, { ReactElement } from 'react';

// import { AccountTransferList } from '@coop/cbs/transactions/account-transfer';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { WorkInProgress } from '@coop/shared/components';
import { Box, MainLayout } from '@coop/shared/ui';

const TransactionsAccountTransferList = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
    </Box>
  );
  // <AccountTransferList />;
};

TransactionsAccountTransferList.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsAccountTransferList;
