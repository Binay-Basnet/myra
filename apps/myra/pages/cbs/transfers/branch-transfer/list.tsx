import { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@myra-ui';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';

const BranchTransfer = () => (
  <Box display="flex" justifyContent="center" alignItems="center" pt="s32">
    <WIPState />
  </Box>
);

BranchTransfer.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransferLayout>{page}</TransferLayout>
    </MainLayout>
  );
};
export default BranchTransfer;
