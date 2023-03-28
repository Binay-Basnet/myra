import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryFeatureItemVariant } from '@coop/myra/inventory/item';

const AddNewItemPage = () => <InventoryFeatureItemVariant />;

export default AddNewItemPage;

AddNewItemPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayoutInventory>{page}</MainLayoutInventory>;
};
