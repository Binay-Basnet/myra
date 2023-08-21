import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { BPMMeetingsDetails } from '@coop/bpm/programs';
import { BPMProgramsSidebarLayout } from '@coop/bpm/ui-layouts';

export const MeetingsDetailsPage = () => <BPMMeetingsDetails />;

MeetingsDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <BPMProgramsSidebarLayout>{page}</BPMProgramsSidebarLayout>
    </MainLayout>
  );
};

export default MeetingsDetailsPage;
