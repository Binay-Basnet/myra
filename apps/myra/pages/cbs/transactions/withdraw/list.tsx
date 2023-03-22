import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { WithdrawList } from '@coop/cbs/transactions/withdraw';

const TransactionsWithdrawList = () => <WithdrawList />;

TransactionsWithdrawList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionsWithdrawList;
