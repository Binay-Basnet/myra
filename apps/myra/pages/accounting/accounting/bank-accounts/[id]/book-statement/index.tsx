import { ReactElement } from 'react';

import { BookStatDetailPage } from '@coop/accounting/accounting';
import { AccountsDetailPageLayout } from '@coop/accounting/ui-components';
import {
  AccountingLayout,
  AccountingSidebarLayout,
} from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingBankAccountsDetail = () => <BookStatDetailPage />;

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
