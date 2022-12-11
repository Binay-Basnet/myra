import { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@myra-ui';

import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';

const FundManagementListPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" pt="s60">
    <WIPState />
  </Box>
);

export default FundManagementListPage;

FundManagementListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};
