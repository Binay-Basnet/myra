import React, { ReactElement } from 'react';

import { InventoryFeatureItem } from '@coop/myra/inventory/item';
import { MainLayoutInventory } from '@coop/shared/ui';

const AddNewItemPage = () => <InventoryFeatureItem />;

export default AddNewItemPage;

AddNewItemPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
