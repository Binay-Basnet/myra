import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AccountingFeatureAddJournalVoucher } from '@coop/accounting/accounting';

const JournalVouchersAdd = () => <AccountingFeatureAddJournalVoucher />;

JournalVouchersAdd.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
export default JournalVouchersAdd;
