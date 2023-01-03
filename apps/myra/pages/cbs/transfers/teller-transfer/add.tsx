import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AddTellerTransfer } from '@coop/cbs/transfer';

const Transfer = () => <AddTellerTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Transfer;
