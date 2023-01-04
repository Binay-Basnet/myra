import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddDeposit } from '@coop/cbs/transactions/deposit';

const TransactionsAddDeposit = () => <AddDeposit />;

TransactionsAddDeposit.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddDeposit;
