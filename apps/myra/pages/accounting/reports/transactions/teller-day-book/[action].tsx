import { ReactElement } from 'react';

import { AccountingLayout } from '@coop/accounting/ui-layouts';
import { TellerDayBookReport } from '@coop/cbs/reports';

const DayBookReportPage = () => <TellerDayBookReport />;

export default DayBookReportPage;

DayBookReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
