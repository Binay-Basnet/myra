import React, { ReactElement } from 'react';

// import { AccountTransferList } from '@coop/cbs/transactions/account-transfer';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TransactionsAccountTransferList = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
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
