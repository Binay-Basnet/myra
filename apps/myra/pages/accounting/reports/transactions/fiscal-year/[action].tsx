import { ReactElement } from 'react';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { FiscalYearReport } from '@coop/cbs/reports';

const FiscalYearReportPage = () => <FiscalYearReport />;

export default FiscalYearReportPage;

FiscalYearReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
