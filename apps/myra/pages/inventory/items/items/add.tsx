import { ReactElement } from 'react';

import { MainLayoutInventory, Scrollable } from '@myra-ui';

import { InventoryFeatureItem } from '@coop/myra/inventory/item';

const AddNewItemPage = () => <InventoryFeatureItem />;

export default AddNewItemPage;

AddNewItemPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <Scrollable>{page}</Scrollable>
    </MainLayoutInventory>
  );
};
