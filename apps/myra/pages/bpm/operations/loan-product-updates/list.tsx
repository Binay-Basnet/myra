import { ReactElement } from 'react';

import { Box } from '@myra-ui';

import { BPMLayout, BPMOperationsSidebarLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <Box> BPM</Box>;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMOperationsSidebarLayout>{page}</BPMOperationsSidebarLayout>
    </BPMLayout>
  );
};
export default AccountingQuickTransferList;
