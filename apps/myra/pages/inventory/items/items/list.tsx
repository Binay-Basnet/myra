import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryItemsLayout } from '@coop/myra/components';
import { InventoryItemTable } from '@coop/myra/inventory/item';

const InventoryProduct = () => <InventoryItemTable />;

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryProduct;
