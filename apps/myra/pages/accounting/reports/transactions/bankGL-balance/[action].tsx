import { ReactElement } from 'react';

import { BankGLBalanceReport } from '@coop/cbs/reports';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const ReportPage = () => <BankGLBalanceReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
