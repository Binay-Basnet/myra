import React, { ReactElement } from 'react';

import { AccountTransferList } from '@coop/cbs/transactions/account-transfer';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const TransactionsAccountTransferList = () => <AccountTransferList />;

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
