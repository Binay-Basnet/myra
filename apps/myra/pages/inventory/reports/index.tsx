import { ReactElement } from 'react';

import { InventoryTabLayout } from '@coop/myra/components';
import { Box, MainLayoutInventory, WIPState } from '@myra-ui';

const InventoryReports = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

InventoryReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryTabLayout>{page}</InventoryTabLayout>
    </MainLayoutInventory>
  );
};
export default InventoryReports;
