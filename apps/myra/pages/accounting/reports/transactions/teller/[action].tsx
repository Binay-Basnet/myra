import { ReactElement } from 'react';

import { TellerReport } from '@coop/cbs/reports';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const ReportPage = () => <TellerReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
