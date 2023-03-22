import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { CashTransitTransferList } from '@coop/cbs/transfer';

const Transfer = () => <CashTransitTransferList />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default Transfer;
