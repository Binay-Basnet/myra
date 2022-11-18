import { ReactElement } from 'react';

import { AccountingFeatureBankAccountsList } from '@coop/accounting/accounting';
import { AccountingLayout, AccountingSidebarLayout } from '@coop/accounting/ui-layouts';
import { Box } from '@coop/shared/ui';

// TODO ( Update this page when design arrives )
const AccountingBankAccountsList = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <AccountingFeatureBankAccountsList />
  </Box>
);

AccountingBankAccountsList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingBankAccountsList;
