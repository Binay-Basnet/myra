import { ReactElement } from 'react';
import { AlternativeChannelList } from '@bpm/feature-requests';

import { BPMLayout, BPMRequestsSidebarLayout } from '@coop/bpm/ui-layouts';

// TODO ( Update this page when design arrives )
const AlternativeChannelListPage = () => <AlternativeChannelList />;

AlternativeChannelListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <BPMLayout>
      <BPMRequestsSidebarLayout>{page}</BPMRequestsSidebarLayout>
    </BPMLayout>
  );
};
export default AlternativeChannelListPage;
