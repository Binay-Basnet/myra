import { ReactElement } from 'react';

import { ProfitAndLossReport } from '@coop/cbs/reports';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const ProfitAndLossReportPage = () => <ProfitAndLossReport />;

export default ProfitAndLossReportPage;

ProfitAndLossReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
