import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddDeposit } from '@coop/cbs/transactions/deposit';

const TransactionsAddDeposit = () => <AddDeposit />;

TransactionsAddDeposit.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default TransactionsAddDeposit;
