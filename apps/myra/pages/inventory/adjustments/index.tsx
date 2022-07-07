import { ReactElement } from 'react';

import {
  InventoryAdjustmentsTable,
  InventoryItemsLayout,
} from '@coop/myra/components';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryAdjustments = () => {
  return <InventoryAdjustmentsTable />;
};

InventoryAdjustments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryAdjustments;
