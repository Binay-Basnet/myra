import { ReactElement } from 'react';

import { SalesLayout } from '@coop/accounting/ui-layouts';
import { Box, MainLayoutInventory, WIPState } from '@coop/shared/ui';

const SalesSettings = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );
};

SalesSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayoutInventory>
      <SalesLayout>{page}</SalesLayout>
    </MainLayoutInventory>
  );
};
export default SalesSettings;
