import { ReactElement } from 'react';

import { Box, WIPState } from '@myra-ui';

import { AccountingLayout, AccountingSidebarLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingLedgerBalanceTransferList = () => (
  <Box pt="s60">
    <WIPState />
  </Box>
);

AccountingLedgerBalanceTransferList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingLedgerBalanceTransferList;
