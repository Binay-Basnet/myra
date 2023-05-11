import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { WarehouseRequestTable } from '@coop/inventory/warehouse';
import { WarehouseLayout } from '@coop/myra/components';

const InventoryWarehousePage = () => <WarehouseRequestTable />;

InventoryWarehousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <WarehouseLayout>{page}</WarehouseLayout>
    </MainLayoutInventory>
  );
};
export default InventoryWarehousePage;
