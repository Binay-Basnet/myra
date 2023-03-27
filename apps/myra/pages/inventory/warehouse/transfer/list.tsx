import { ReactElement } from 'react';

import { Box, MainLayoutInventory, WIPState } from '@myra-ui';

import { WarehouseLayout } from '@coop/myra/components';

const InventoryWarehousePage = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

InventoryWarehousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <WarehouseLayout>{page}</WarehouseLayout>
    </MainLayoutInventory>
  );
};
export default InventoryWarehousePage;
