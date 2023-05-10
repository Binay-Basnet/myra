import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { BulkTransferAdd } from '@coop/cbs/others/bulk-transfer';

const BulkTransferAddPage = () => <BulkTransferAdd />;

export default BulkTransferAddPage;

BulkTransferAddPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
