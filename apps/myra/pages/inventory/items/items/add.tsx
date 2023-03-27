import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryFeatureItem } from '@coop/myra/inventory/item';

const AddNewItemPage = () => <InventoryFeatureItem />;

export default AddNewItemPage;

AddNewItemPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
