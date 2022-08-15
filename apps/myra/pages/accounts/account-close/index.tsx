import React, { ReactElement } from 'react';

import { AccountPagesLayout } from '@coop/myra/components';
import { WorkInProgress } from '@coop/shared/components';
import { Box, MainLayout } from '@coop/shared/ui';

const AccountOpen = () => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <WorkInProgress />
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
