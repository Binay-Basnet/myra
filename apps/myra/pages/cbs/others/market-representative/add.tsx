import { ReactElement } from 'react';

import { Box, MainLayout, Scrollable, WIPState } from '@myra-ui';

const FundManagementAddPage = () => (
  <Box display="flex" justifyContent="center" alignItems="center" pt="60px">
    <WIPState />
  </Box>
);

export default FundManagementAddPage;

FundManagementAddPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
