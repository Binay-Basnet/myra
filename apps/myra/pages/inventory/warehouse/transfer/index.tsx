import { ReactElement } from 'react';

import { WarehouseLayout } from '@coop/myra/components';
import { Box, MainLayoutInventory, WIPState } from '@coop/shared/ui';

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
