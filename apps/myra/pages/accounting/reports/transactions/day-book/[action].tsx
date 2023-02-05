import { ReactElement } from 'react';

import { DayBookReport } from '@coop/cbs/reports';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const DayBookReportPage = () => <DayBookReport />;

export default DayBookReportPage;

DayBookReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
