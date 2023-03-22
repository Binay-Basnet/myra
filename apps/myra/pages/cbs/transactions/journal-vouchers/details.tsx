import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { JournalVoucerDetailPage } from '@coop/accounting/details';
import { TransactionDetailPathBar } from '@coop/cbs/transactions/ui-components';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';

// TODO ( Update this page when design arrives )
const AccountingJournalVoucherView = () => (
  <>
    <TransactionDetailPathBar title="Journal Vouchers" />
    <JournalVoucerDetailPage />
  </>
);

AccountingJournalVoucherView.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>{page}</TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default AccountingJournalVoucherView;
