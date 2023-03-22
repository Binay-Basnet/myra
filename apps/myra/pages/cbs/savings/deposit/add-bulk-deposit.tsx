import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AddBulkDeposit } from '@coop/cbs/transactions/deposit';

const TransactionsAddBulkDeposit = () => <AddBulkDeposit />;

TransactionsAddBulkDeposit.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default TransactionsAddBulkDeposit;
