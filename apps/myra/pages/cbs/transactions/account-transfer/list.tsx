import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AccountTransferList } from '@coop/cbs/transactions/account-transfer';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

const TransactionsAccountTransferList = () => <AccountTransferList />;

TransactionsAccountTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsAccountTransferList;
