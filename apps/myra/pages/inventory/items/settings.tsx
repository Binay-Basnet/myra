import { ReactElement } from 'react';

import { InventoryItemsLayout } from '@coop/myra/components';
import { Box, MainLayoutInventory, WIPState } from '@myra-ui';

const ItemsSettings = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

ItemsSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryItemsLayout>{page}</InventoryItemsLayout>
    </MainLayoutInventory>
  );
};
export default ItemsSettings;
