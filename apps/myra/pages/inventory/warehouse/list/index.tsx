import { ReactElement } from 'react';

import { WarehouseLayout } from '@coop/myra/components';
import { SupplierTable } from '@coop/myra/inventory/suppliers';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryWarehousePage = () => {
  return <SupplierTable />;
};

InventoryWarehousePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <WarehouseLayout>{page}</WarehouseLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryWarehousePage;
