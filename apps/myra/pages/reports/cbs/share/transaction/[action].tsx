import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { ShareTransactionsReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <ShareTransactionsReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
