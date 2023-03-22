import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { LoanRequestList } from '@coop/cbs/requests/lists';

const LoanRequestPage = () => <LoanRequestList />;

export default LoanRequestPage;

LoanRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
