import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddCashTransitTransfer } from '@coop/cbs/transfer';

const Transfer = () => <AddCashTransitTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Transfer;
