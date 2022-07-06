import { ReactElement } from 'react';

import {
  InventoryItemAdjustmentsTable,
  InventoryItemsLayout,
} from '@coop/myra/components';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryAdjustments = () => {
  return <InventoryItemAdjustmentsTable />;
};

InventoryAdjustments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryAdjustments;
