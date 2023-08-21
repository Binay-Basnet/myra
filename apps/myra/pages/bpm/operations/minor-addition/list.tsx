import { ReactElement } from 'react';

import { BPMOperationsMinorsList } from '@coop/bpm/operations';
import { BPMLayout, BPMOperationsSidebarLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <BPMOperationsMinorsList />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMOperationsSidebarLayout>{page}</BPMOperationsSidebarLayout>
    </BPMLayout>
  );
};
export default AccountingQuickTransferList;
