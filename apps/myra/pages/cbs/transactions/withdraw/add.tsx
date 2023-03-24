import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddWithdraw } from '@coop/cbs/transactions/withdraw';

const TransactionsAddWithdraw = () => <AddWithdraw />;

TransactionsAddWithdraw.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default TransactionsAddWithdraw;
