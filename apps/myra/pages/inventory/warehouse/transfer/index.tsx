import { ReactElement } from 'react';

// import { WarehouseTransferTable } from '@coop/inventory/warehouse';
import { WarehouseLayout } from '@coop/myra/components';
import { Box, MainLayoutInventory, WIPState } from '@coop/shared/ui';

const InventoryWarehousePage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );
  // <WarehouseTransferTable />;
};

InventoryWarehousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <WarehouseLayout>{page}</WarehouseLayout>
    </MainLayoutInventory>
  );
};
export default InventoryWarehousePage;
