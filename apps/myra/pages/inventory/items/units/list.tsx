import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryItemsLayout, InventoryItemUnitsTable } from '@coop/myra/components';

const InventoryUnits = () => <InventoryItemUnitsTable />;

InventoryUnits.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryUnits;
