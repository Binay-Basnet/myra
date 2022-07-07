import { ReactElement } from 'react';

import { WarehouseTransferTable } from '@coop/inventory/warehouse';
import { WarehouseLayout } from '@coop/myra/components';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryWarehousePage = () => {
  return <WarehouseTransferTable />;
};

InventoryWarehousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <WarehouseLayout>{page}</WarehouseLayout>
    </MainLayoutInventory>
  );
};
export default InventoryWarehousePage;
