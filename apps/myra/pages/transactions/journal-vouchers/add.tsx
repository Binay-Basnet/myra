import { ReactElement } from 'react';

import { AccountingFeatureAddJournalVoucher } from '@coop/accounting/accounting';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const JournalVouchersAdd = () => <AccountingFeatureAddJournalVoucher />;

JournalVouchersAdd.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
export default JournalVouchersAdd;
