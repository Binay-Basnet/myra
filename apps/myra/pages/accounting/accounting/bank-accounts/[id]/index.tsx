import { ReactElement } from 'react';

import { BankAccountDetailPage } from '@coop/accounting/accounting';
import { AccountsDetailPageLayout } from '@coop/accounting/ui-components';
import {
  AccountingLayout,
  AccountingSidebarLayout,
} from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingBankAccountsDetail = () => {
  return <BankAccountDetailPage />;
};

AccountingBankAccountsDetail.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>
        <AccountsDetailPageLayout>{page}</AccountsDetailPageLayout>
      </AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingBankAccountsDetail;
