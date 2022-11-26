import { ReactElement } from 'react';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { LoanRequestList } from '@coop/cbs/requests/lists';
import { MainLayout } from '@myra-ui';

const LoanRequestPage = () => <LoanRequestList />;

export default LoanRequestPage;

LoanRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
