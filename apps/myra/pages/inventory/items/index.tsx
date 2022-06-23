import { ReactElement } from 'react';

import {
  InventoryItemsLayout,
  InventoryItemTable,
} from '@coop/myra/components';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryProduct = () => {
  return <InventoryItemTable />;
};

InventoryProduct.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryProduct;
