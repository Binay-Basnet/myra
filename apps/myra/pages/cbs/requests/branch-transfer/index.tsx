import { ReactElement } from 'react';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { BranchTransferRequstList } from '@coop/cbs/requests/lists';
import { MainLayout } from '@myra-ui';

const BranchTransferRequestPage = () => <BranchTransferRequstList />;

export default BranchTransferRequestPage;

BranchTransferRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
