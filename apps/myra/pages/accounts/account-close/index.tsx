import React, { ReactElement } from 'react';

import { AccountPagesLayout } from '@coop/myra/components';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const AccountOpen = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );
};

AccountOpen.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountOpen;
