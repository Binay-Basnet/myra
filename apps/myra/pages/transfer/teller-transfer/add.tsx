import { ReactElement } from 'react';

import { AddTellerTransfer } from '@coop/cbs/transfer';
import { MainLayout } from '@coop/shared/ui';

const Transfer = () => <AddTellerTransfer />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Transfer;
