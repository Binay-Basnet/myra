import { ReactElement } from 'react';

import { CollateralManagementAdd } from '@coop/bpm/operations';
import { BPMLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const CollateralAddPage = () => <CollateralManagementAdd />;

CollateralAddPage.getLayout = function getLayout(page: ReactElement) {
  return <BPMLayout>{page}</BPMLayout>;
};
export default CollateralAddPage;
