import { ReactElement } from 'react';

import { MainLayoutInventory } from '@myra-ui';

import { InventoryItemCategoryTable, InventoryItemsLayout } from '@coop/myra/components';

const InventoryCategory = () => <InventoryItemCategoryTable />;

InventoryCategory.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryCategory;
