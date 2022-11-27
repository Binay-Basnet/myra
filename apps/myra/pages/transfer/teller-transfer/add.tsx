import { ReactElement } from 'react';

import { AddTellerTransfer } from '@coop/cbs/transfer';
import { MainLayout } from '@myra-ui';

const Transfer = () => <AddTellerTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Transfer;
