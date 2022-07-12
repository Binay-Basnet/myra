import { ReactElement } from 'react';

import { AccountingFeatureJournalVouchersList } from '@coop/accounting/accounting';
import {
  AccountingLayout,
  AccountingSidebarLayout,
} from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingJournalVouchersList = () => {
  return <AccountingFeatureJournalVouchersList />;
};

AccountingJournalVouchersList.getLayout = function getLayout(
  page: ReactElement
) {
  return (
    <AccountingLayout>
      <AccountingSidebarLayout>{page}</AccountingSidebarLayout>
    </AccountingLayout>
  );
};
export default AccountingJournalVouchersList;
