import { ReactElement } from 'react';

import { DepositList } from '@coop/cbs/transactions/deposit';
import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@coop/shared/ui';

const Transfer = () => <DepositList />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default Transfer;
