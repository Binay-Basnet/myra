import { ReactElement } from 'react';

import { BPMProgramsMeetingsList } from '@coop/bpm/programs';
import { BPMLayout, BPMProgramsSidebarLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <BPMProgramsMeetingsList />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMProgramsSidebarLayout>{page}</BPMProgramsSidebarLayout>
    </BPMLayout>
  );
};
export default AccountingQuickTransferList;
