import { ReactElement } from 'react';

import { CashLedgersReport } from '@coop/cbs/reports';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const ReportPage = () => <CashLedgersReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
