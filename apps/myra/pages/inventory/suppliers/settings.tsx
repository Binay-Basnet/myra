import { ReactElement } from 'react';

import { SuppliersLayout } from '@coop/myra/components';
import { Box, MainLayoutInventory, WIPState } from '@myra-ui';

const SuppliersSettings = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

SuppliersSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <SuppliersLayout>{page}</SuppliersLayout>
    </MainLayoutInventory>
  );
};
export default SuppliersSettings;
