import { ReactElement } from 'react';
import { TransferDetailsHeader } from 'libs/cbs/transfer/feature-detail-page/src/component';

import { MainLayout, Scrollable } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { VaultTransferDetailPage } from '@coop/cbs/transfer/detail';

const TransferView = () => (
  <>
    <TransferDetailsHeader title="Vault Transfer" />
    <VaultTransferDetailPage />
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
