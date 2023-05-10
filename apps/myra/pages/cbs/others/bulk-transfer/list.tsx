import { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@myra-ui';

import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';

const BulkTransfersListPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" pt="60px">
    <WIPState />
  </Box>
);

export default BulkTransfersListPage;

BulkTransfersListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};
