import { ReactElement } from 'react';

import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

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
