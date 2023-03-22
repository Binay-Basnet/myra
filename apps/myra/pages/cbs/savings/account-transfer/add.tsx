import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { NewAccountTransfer } from '@coop/cbs/transactions/account-transfer';

const TransactionsAddAccountTransfer = () => (
  <NewAccountTransfer />
  // <Box display="flex" justifyContent="center" alignItems="center">
  //   <WIPState />
  // </Box>
);

TransactionsAddAccountTransfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default TransactionsAddAccountTransfer;
