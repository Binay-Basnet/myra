import { ReactElement } from 'react';

import { WithdrawList } from '@coop/cbs/transactions/withdraw';
import { AccountPagesLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

const TransactionsWithdrawList = () => <WithdrawList />;

TransactionsWithdrawList.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default TransactionsWithdrawList;
