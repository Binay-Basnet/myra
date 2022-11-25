import { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const FundManagementAddPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" pt="s60">
    <WIPState />
  </Box>
);

export default FundManagementAddPage;

FundManagementAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
