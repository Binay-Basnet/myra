import { ReactElement } from 'react';

import { AddDeposit } from '@coop/cbs/transactions/deposit';
import { MainLayout } from '@myra-ui';

const TransactionsAddDeposit = () => <AddDeposit />;

TransactionsAddDeposit.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default TransactionsAddDeposit;
