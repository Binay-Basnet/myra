import { ReactElement } from 'react';

import { BalanceSheetReport } from '@coop/cbs/reports';
import { AccountingLayout } from '@coop/accounting/ui-layouts';

const NewShareStatementReport = () => <BalanceSheetReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <AccountingLayout>{page}</AccountingLayout>;
};
