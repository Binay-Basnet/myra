import { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@myra-ui';

import { WithdrawSlipLayout } from '@coop/myra/components';

const WithdrawSlip = () => (
  <Box display="flex" p={5} justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

WithdrawSlip.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <WithdrawSlipLayout>{page}</WithdrawSlipLayout>{' '}
    </MainLayout>
  );
};

export default WithdrawSlip;
