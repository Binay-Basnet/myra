import { ReactElement } from 'react';
import { TransferDetailsHeader } from 'libs/cbs/transfer/feature-detail-page/src/component';

import { MainLayout } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { TellerTransferDetailPage } from '@coop/cbs/transfer/detail';

const TransferView = () => (
  <>
    <TransferDetailsHeader title="Teller Transfer" />
    <TellerTransferDetailPage />
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
