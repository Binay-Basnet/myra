import { ReactElement } from 'react';

import {
  // InventoryItemCategoryTable,
  InventoryItemsLayout,
} from '@coop/myra/components';
import { WorkInProgress } from '@coop/shared/components';
import { Box, MainLayoutInventory } from '@coop/shared/ui';

const InventoryCategory = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
    </Box>
  );
  // <InventoryItemCategoryTable />;
};

InventoryCategory.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>{' '}
    </MainLayoutInventory>
  );
};
export default InventoryCategory;
