import { ReactElement } from 'react';

import { BankGLStatementReport } from '@coop/cbs/reports';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const ReportPage = () => <BankGLStatementReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
