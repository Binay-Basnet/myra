import { ReactElement } from 'react';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { ChequeBookRequestList } from '@coop/cbs/requests/lists';
import { MainLayout, Scrollable } from '@myra-ui';

const ChequeBookRequestPage = () => <ChequeBookRequestList />;

export default ChequeBookRequestPage;

ChequeBookRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
