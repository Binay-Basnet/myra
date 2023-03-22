import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { WithdrawList } from '@coop/cbs/transactions/withdraw';
import { AccountPagesLayout } from '@coop/myra/components';

const TransactionsWithdrawList = () => <WithdrawList />;

TransactionsWithdrawList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default TransactionsWithdrawList;
