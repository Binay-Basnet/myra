import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryItemsLayout } from '@coop/myra/components';
import { InventoryItemCategoryTable } from '@coop/myra/inventory/item';

const InventoryCategory = () => <InventoryItemCategoryTable />;

InventoryCategory.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryCategory;
