import { ReactElement } from 'react';

import { AccountingLayout, SalesLayout } from '@coop/accounting/ui-layouts';
import { Box, WIPState } from '@myra-ui';

const SalesSettings = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

SalesSettings.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <SalesLayout>{page}</SalesLayout>
    </AccountingLayout>
  );
};
export default SalesSettings;
