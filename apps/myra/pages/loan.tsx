import React, { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const Loan = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );
};

Loan.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Loan;
