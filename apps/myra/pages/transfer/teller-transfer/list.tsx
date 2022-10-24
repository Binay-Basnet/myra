import { ReactElement } from 'react';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { TellerTransferList } from '@coop/cbs/transfer';
import { MainLayout } from '@coop/shared/ui';

const Transfer = () => <TellerTransferList />;

Transfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default Transfer;
