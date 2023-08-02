import { ReactElement } from 'react';

import { BPMMeetingsAdd } from '@coop/bpm/programs';
import { BPMLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingQuickTransferList = () => <BPMMeetingsAdd />;

AccountingQuickTransferList.getLayout = function getLayout(page: ReactElement) {
  return <BPMLayout>{page}</BPMLayout>;
};
export default AccountingQuickTransferList;
