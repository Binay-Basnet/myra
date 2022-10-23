import { ReactElement } from 'react';

import { RequestListLayout } from '@coop/cbs/requests/layout';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const ChequeBookRequestPage = () => (
  <Box minH="calc(100vh - 110px)" display="flex" alignItems="center" justifyContent="center">
    <WIPState />
  </Box>
);

export default ChequeBookRequestPage;

ChequeBookRequestPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <RequestListLayout>{page}</RequestListLayout>
    </MainLayout>
  );
};
