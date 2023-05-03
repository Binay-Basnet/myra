import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddWithdraw } from '@coop/cbs/transactions/withdraw';

const TransactionsAddWithdraw = () => <AddWithdraw />;

TransactionsAddWithdraw.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddWithdraw;
