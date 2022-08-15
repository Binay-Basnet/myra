import { ReactElement } from 'react';

// import { WarehouseTransferTable } from '@coop/inventory/warehouse';
import { WarehouseLayout } from '@coop/myra/components';
import { WorkInProgress } from '@coop/shared/components';
import { Box, MainLayoutInventory } from '@coop/shared/ui';

const InventoryWarehousePage = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
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
