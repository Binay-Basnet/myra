import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryAdjustmentsTableList, InventoryTabLayout } from '@coop/myra/components';

const InventoryAdjustments = () => <InventoryAdjustmentsTableList />;

InventoryAdjustments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryTabLayout>{page}</InventoryTabLayout>
    </MainLayoutInventory>
  );
};
export default InventoryAdjustments;
