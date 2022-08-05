import React from 'react';

import { AccountTransferForm } from '@coop/ebanking/accounts';
import { Box, PathBar } from '@coop/shared/ui';

const AccountTransfer = () => {
  return (
    <Box display="flex" flexDir="column" gap="s16">
      <PathBar
        paths={[
          { label: 'Home', link: '/home' },
          { label: 'Account Transfer', link: '/home/account-transfer' },
        ]}
      />

      <AccountTransferForm />
    </Box>
  );
};

export default AccountTransfer;
