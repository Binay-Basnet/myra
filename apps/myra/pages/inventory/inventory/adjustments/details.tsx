import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryAdjustmentDetails } from '@coop/inventory/inventory';
import { InventoryTabLayout } from '@coop/myra/components';

const InventoryAdjustmentDetailsPage = () => <InventoryAdjustmentDetails />;

InventoryAdjustmentDetailsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryTabLayout>{page}</InventoryTabLayout>
    </MainLayoutInventory>
  );
};
export default InventoryAdjustmentDetailsPage;
