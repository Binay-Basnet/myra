import React, { ReactElement } from 'react';

import { WorkInProgress } from '@coop/shared/components';
import { Box, MainLayout } from '@coop/shared/ui';

const Loan = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
    </Box>
  );
};

Loan.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default Loan;
