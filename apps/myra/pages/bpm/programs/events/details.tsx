import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { BPMEventsDetails } from '@coop/bpm/programs';
import { BPMProgramsSidebarLayout } from '@coop/bpm/ui-layouts';

export const EventsDEtailsPage = () => <BPMEventsDetails />;

EventsDEtailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <BPMProgramsSidebarLayout>{page}</BPMProgramsSidebarLayout>
    </MainLayout>
  );
};

export default EventsDEtailsPage;
