import { ReactElement } from 'react';

import { Box } from '@myra-ui';

import { BPMLayout, BPMProgramsSidebarLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <Box> BPM</Box>;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMProgramsSidebarLayout>{page}</BPMProgramsSidebarLayout>
    </BPMLayout>
  );
};
export default AccountingQuickTransferList;
