import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryItemsLayout } from '@coop/myra/components';
import { InventoryItemUnitsTable } from '@coop/myra/inventory/item';

const InventoryUnits = () => <InventoryItemUnitsTable />;

InventoryUnits.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryUnits;
