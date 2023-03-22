import { ReactElement } from 'react';
import { TransferDetailsHeader } from 'libs/cbs/transfer/feature-detail-page/src/component';

import { MainLayout } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { VaultBankTransferPage } from '@coop/cbs/transfer/detail';

const TransferView = () => (
  <>
    <TransferDetailsHeader title="Teller - Bank Transfer" page="Bank Transfer" />
    <VaultBankTransferPage />
  </>
);

TransferView.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default TransferView;
