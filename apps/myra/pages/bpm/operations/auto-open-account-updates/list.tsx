import { ReactElement } from 'react';

import { BPMOperationsAccountAutopUpdateList } from '@coop/bpm/operations';
import { BPMLayout, BPMOperationsSidebarLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <BPMOperationsAccountAutopUpdateList />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMOperationsSidebarLayout>{page}</BPMOperationsSidebarLayout>
    </BPMLayout>
  );
};
export default AccountingQuickTransferList;
