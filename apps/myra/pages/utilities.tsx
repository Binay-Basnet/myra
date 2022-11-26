import React, { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@myra-ui';

const Utilities = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

Utilities.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Utilities;
