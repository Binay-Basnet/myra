import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { BranchTransferRequstList } from '@coop/cbs/requests/lists';

const BranchTransferRequestPage = () => <BranchTransferRequstList />;

export default BranchTransferRequestPage;

BranchTransferRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
