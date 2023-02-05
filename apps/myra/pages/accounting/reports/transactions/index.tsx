import { ReactElement } from 'react';

import { AccountingLayout, AccountingReportsLayout } from '@coop/accounting/ui-layouts';
import { ReportsAccountingLayout } from '@coop/cbs/reports/layout';
import { TransactionReportList } from '@coop/cbs/reports/list';

const LoanReports = () => (
  <TransactionReportList reportParentLink="/accounting/reports/transactions" />
);

LoanReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      <AccountingReportsLayout>
        <ReportsAccountingLayout>{page}</ReportsAccountingLayout>
      </AccountingReportsLayout>
    </AccountingLayout>
  );
};
export default LoanReports;
