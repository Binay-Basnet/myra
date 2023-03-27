import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { SuppliersLayout } from '@coop/myra/components';
import { SupplierTable } from '@coop/myra/inventory/suppliers';

const InventoryVendor = () => <SupplierTable />;

InventoryVendor.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <SuppliersLayout>{page}</SuppliersLayout>
    </MainLayoutInventory>
  );
};
export default InventoryVendor;
