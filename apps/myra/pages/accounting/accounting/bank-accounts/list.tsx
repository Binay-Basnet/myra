import { ReactElement } from 'react';

import { AccountingFeatureBankAccountsList } from '@coop/accounting/accounting';
import { AccountingLayout, AccountingSidebarLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingBankAccountsList = () => <AccountingFeatureBankAccountsList />;

AccountingBankAccountsList.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingBankAccountsList;
