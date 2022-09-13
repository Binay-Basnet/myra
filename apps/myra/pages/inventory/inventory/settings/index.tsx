import { ReactElement } from 'react';

import { InventoryTabLayout } from '@coop/myra/components';
import { Box, MainLayoutInventory, WIPState } from '@coop/shared/ui';

const InventorySettings = () => (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );

InventorySettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <InventoryTabLayout>{page}</InventoryTabLayout>
    </MainLayoutInventory>
  );
};
export default InventorySettings;
