import { ReactElement } from 'react';

import { AccountingFeatureAddJournalVoucher } from '@coop/accounting/accounting';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingJournalVoucherAdd = () => {
  return <AccountingFeatureAddJournalVoucher />;
};

AccountingJournalVoucherAdd.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default AccountingJournalVoucherAdd;
