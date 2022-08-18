import React, { ReactElement } from 'react';

import { AccountPagesLayout } from '@coop/myra/components';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const AccountCloseAdd = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WIPState />
    </Box>
  );
};

AccountCloseAdd.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountPagesLayout>{page}</AccountPagesLayout>
    </MainLayout>
  );
};
export default AccountCloseAdd;
