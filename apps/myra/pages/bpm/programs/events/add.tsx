import { ReactElement } from 'react';

import { BPMEventsAdd } from '@coop/bpm/programs';
import { BPMLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <BPMEventsAdd />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return <BPMLayout>{page}</BPMLayout>;
};
export default AccountingQuickTransferList;
