import { ReactElement } from 'react';

import {
  InventoryItemCategoryTable,
  InventoryItemsLayout,
} from '@coop/myra/components';
import { MainLayoutInventory } from '@coop/shared/ui';

const InventoryCategory = () => {
  return <InventoryItemCategoryTable />;
};

InventoryCategory.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryCategory;
