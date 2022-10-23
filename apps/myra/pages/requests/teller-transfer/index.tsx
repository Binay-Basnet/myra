import { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TellerTransferRequestPage = () => (
  <Box minH="calc(100vh - 110px)" display="flex" alignItems="center" justifyContent="center">
    <WIPState />
  </Box>
);

export default TellerTransferRequestPage;

TellerTransferRequestPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
