import { ReactElement } from 'react';

import { Box, WIPState } from '@myra-ui';

import { AccountingLayout, SalesLayout } from '@coop/accounting/ui-layouts';

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
