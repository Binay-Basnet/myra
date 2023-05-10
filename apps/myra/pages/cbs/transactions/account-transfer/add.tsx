import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { NewAccountTransfer } from '@coop/cbs/transactions/account-transfer';

const TransactionsAddAccountTransfer = () => (
  <NewAccountTransfer />
  // <Box display="flex" justifyContent="center" alignItems="center">
  //   <WIPState />
  // </Box>
);

TransactionsAddAccountTransfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddAccountTransfer;
