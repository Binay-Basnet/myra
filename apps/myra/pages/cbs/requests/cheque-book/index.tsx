import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { ChequeBookRequestList } from '@coop/cbs/requests/lists';

const ChequeBookRequestPage = () => <ChequeBookRequestList />;

export default ChequeBookRequestPage;

ChequeBookRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
