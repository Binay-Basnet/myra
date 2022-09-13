import React, { ReactElement } from 'react';

import { InventoryFeatureAdjustment } from '@coop/inventory/inventory';
import { MainLayoutInventory } from '@coop/shared/ui';

const AddInventoryAdjustments = () => <InventoryFeatureAdjustment />;

export default AddInventoryAdjustments;

AddInventoryAdjustments.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
