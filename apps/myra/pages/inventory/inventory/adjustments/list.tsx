import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryAdjustmentsTable, InventoryTabLayout } from '@coop/myra/components';

const InventoryAdjustments = () => <InventoryAdjustmentsTable />;

InventoryAdjustments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryTabLayout>{page}</InventoryTabLayout>
    </MainLayoutInventory>
  );
};
export default InventoryAdjustments;
