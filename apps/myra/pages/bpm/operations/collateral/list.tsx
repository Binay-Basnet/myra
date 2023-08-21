import { ReactElement } from 'react';

import { CollateralManagementList } from '@coop/bpm/operations';
import { BPMLayout, BPMOperationsSidebarLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const CollateralListPage = () => <CollateralManagementList />;

CollateralListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMOperationsSidebarLayout>{page}</BPMOperationsSidebarLayout>
    </BPMLayout>
  );
};
export default CollateralListPage;
