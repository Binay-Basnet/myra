import { ReactElement } from 'react';

import { AddWithdraw } from '@coop/cbs/transactions/withdraw';
import { MainLayout } from '@myra-ui';

const TransactionsAddWithdraw = () => <AddWithdraw />;

TransactionsAddWithdraw.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddWithdraw;
