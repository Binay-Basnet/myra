import React, { ReactElement } from 'react';

import { InventoryFeatureItemAdjustment } from '@coop/myra/inventory/item';
import { MainLayoutInventory } from '@coop/shared/ui';

const AddInventoryAdjustments = () => {
  return <InventoryFeatureItemAdjustment />;
};

export default AddInventoryAdjustments;

AddInventoryAdjustments.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
