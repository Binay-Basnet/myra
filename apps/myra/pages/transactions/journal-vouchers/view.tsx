import { ReactElement } from 'react';
import { JournalVoucerDetailPage } from 'libs/accounting/feature-accounting-detail/src';

import { AccountingLayout, AccountingSidebarLayout } from '@coop/accounting/ui-layouts';
import { DetailPathBar } from '@coop/cbs/settings/ui-layout';
import { TransactionsSidebarLayout } from '@coop/cbs/transactions/ui-layouts';
import { MainLayout } from '@myra-ui';

// TODO ( Update this page when design arrives )
const AccountingJournalVoucherView = () => (
  <>
    <DetailPathBar title="Journal Vouchers" />
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
