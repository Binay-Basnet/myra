import { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const LoanRepayments = () => (
  <Box display="flex" justifyContent="center" alignItems="center" pt="s32">
    <WIPState />
  </Box>
);

export default LoanRepayments;

LoanRepayments.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
