import { ReactElement } from 'react';

import { BPMLayout, BPMRequestsSidebarLayout } from '@coop/bpm/ui-layouts';
import { MemberRequestPage } from '@coop/cbs/requests/lists';

// TODO ( Update this page when design arrives )
const MembershipList = () => <MemberRequestPage />;

MembershipList.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMRequestsSidebarLayout>{page}</BPMRequestsSidebarLayout>
    </BPMLayout>
  );
};
export default MembershipList;
