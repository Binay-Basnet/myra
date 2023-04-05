import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { WarehouseTransferTable } from '@coop/inventory/warehouse';
import { WarehouseLayout } from '@coop/myra/components';

const InventoryWarehousePage = () => <WarehouseTransferTable />;

InventoryWarehousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <WarehouseLayout>{page}</WarehouseLayout>
    </MainLayoutInventory>
  );
};
export default InventoryWarehousePage;
