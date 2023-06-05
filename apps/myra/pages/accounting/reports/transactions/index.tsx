import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { AccountingReportsLayout } from '@coop/accounting/ui-layouts';
import { ReportsAccountingLayout } from '@coop/cbs/reports/layout';
import { TransactionReportList } from '@coop/cbs/reports/list';

const LoanReports = () => (
  <TransactionReportList reportParentLink="/accounting/reports/transactions" />
);

LoanReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AccountingReportsLayout>
        <ReportsAccountingLayout>{page}</ReportsAccountingLayout>
      </AccountingReportsLayout>
    </MainLayout>
  );
};
export default LoanReports;
