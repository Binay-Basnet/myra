import { ReactElement } from 'react';

import { TransferLayout } from '@coop/cbs/transactions/ui-layouts';
import { Box, MainLayout, WIPState } from '@myra-ui';

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
