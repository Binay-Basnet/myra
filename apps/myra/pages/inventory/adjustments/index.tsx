import { ReactElement } from 'react';

import {
  InventoryAdjustmentsTable,
  InventoryTabLayout,
} from '@coop/myra/components';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryAdjustments = () => <InventoryAdjustmentsTable />;

InventoryAdjustments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryTabLayout>{page}</InventoryTabLayout>
    </MainLayoutInventory>
  );
};
export default InventoryAdjustments;
