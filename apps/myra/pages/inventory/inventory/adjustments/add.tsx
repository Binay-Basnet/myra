import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryFeatureAdjustment } from '@coop/inventory/inventory';

const AddInventoryAdjustments = () => <InventoryFeatureAdjustment />;

export default AddInventoryAdjustments;

AddInventoryAdjustments.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
