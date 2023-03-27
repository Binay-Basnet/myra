import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryItemsLayout, InventoryItemTable } from '@coop/myra/components';

const InventoryProduct = () => <InventoryItemTable />;

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryProduct;
