import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { BulkTransferList } from '@coop/cbs/others/bulk-transfer';
import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';

const BulkTransfersListPage = () => <BulkTransferList />;

export default BulkTransfersListPage;

BulkTransfersListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};
