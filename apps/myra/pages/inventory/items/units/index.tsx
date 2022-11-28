import { ReactElement } from 'react';

import { InventoryItemsLayout, InventoryItemUnitsTable } from '@coop/myra/components';
import { MainLayoutInventory } from '@myra-ui';

const InventoryUnits = () => <InventoryItemUnitsTable />;

InventoryUnits.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryUnits;
