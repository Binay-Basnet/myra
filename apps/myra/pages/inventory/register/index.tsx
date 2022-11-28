import { ReactElement } from 'react';

import { InventoryRegisterTable, InventoryTabLayout } from '@coop/myra/components';
import { MainLayoutInventory } from '@myra-ui';

const Inventory = () => <InventoryRegisterTable />;

Inventory.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryTabLayout>{page}</InventoryTabLayout>{' '}
    </MainLayoutInventory>
  );
};
export default Inventory;
