import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { BPMMeetingsDetails } from '@coop/bpm/programs';
import { LoanListLayout } from '@coop/cbs/loan/layouts';

export const MeetingsDetailsPage = () => <BPMMeetingsDetails />;

MeetingsDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <LoanListLayout>{page}</LoanListLayout>
    </MainLayout>
  );
};

export default MeetingsDetailsPage;
