import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { AccountingFeatureAddJournalVoucher } from '@coop/accounting/accounting';

const JournalVouchersAdd = () => <AccountingFeatureAddJournalVoucher />;

JournalVouchersAdd.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
export default JournalVouchersAdd;
