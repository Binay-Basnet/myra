import React, { ReactElement } from 'react';

import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { WithdrawList } from '@coop/cbs/transactions/withdraw';
import { MainLayout } from '@coop/shared/ui';

const TransactionsWithdrawList = () => {
  return <WithdrawList />;
};

TransactionsWithdrawList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsWithdrawList;
