import { ReactElement } from 'react';

import { SuppliersLayout } from '@coop/myra/components';
import { SupplierTable } from '@coop/myra/inventory/suppliers';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryVendor = () => {
  return <SupplierTable />;
};

InventoryVendor.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <SuppliersLayout>{page}</SuppliersLayout>
    </MainLayoutInventory>
  );
};
export default InventoryVendor;
