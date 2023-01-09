import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { CashTransitTransferDetailPage } from '@coop/cbs/transfer/detail';
import { TransferDetailsHeader } from 'libs/cbs/transfer/feature-detail-page/src/component';

const CashTransferDetail = () => (
  <>
    <TransferDetailsHeader title="Cash in Transit Transfer" />
    <CashTransitTransferDetailPage />
  </>
);

CashTransferDetail.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default CashTransferDetail;
