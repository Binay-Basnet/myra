import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryRegisterTable } from '@coop/inventory/inventory';
import { InventoryTabLayout } from '@coop/myra/components';

const Inventory = () => <InventoryRegisterTable />;

Inventory.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryTabLayout>{page}</InventoryTabLayout>{' '}
    </MainLayoutInventory>
  );
};
export default Inventory;
