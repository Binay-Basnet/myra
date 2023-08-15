import { ReactElement } from 'react';

import { BPMOperationsLoanProductUpdateList } from '@coop/bpm/operations';
import { BPMLayout, BPMOperationsSidebarLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <BPMOperationsLoanProductUpdateList />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMOperationsSidebarLayout>{page}</BPMOperationsSidebarLayout>
    </BPMLayout>
  );
};
export default AccountingQuickTransferList;
