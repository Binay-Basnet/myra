import React from 'react';
import { Box } from '@chakra-ui/react';

import { AccountingTabMenu } from '@coop/accounting/ui-components';
import { TopLevelHeader } from '@myra-ui';

export interface AccountingLayoutProps {
  children: React.ReactNode;
}

export const AccountingLayout = (props: AccountingLayoutProps) => {
  const { children } = props;
  return (
    <div>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        <TopLevelHeader />
        <AccountingTabMenu />
      </Box>
      <Box mt="110px">{children}</Box>
    </div>
  );
};

export default AccountingLayout;
