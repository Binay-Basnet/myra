import React, { ReactElement } from 'react';

// import { NewAccountTransfer } from '@coop/cbs/transactions/account-transfer';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TransactionsAddAccountTransfer = () => {
  return (
    // <NewAccountTransfer />
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );
};

TransactionsAddAccountTransfer.getLayout = function getLayout(
  page: ReactElement
) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddAccountTransfer;
