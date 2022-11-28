import { ReactElement } from 'react';

import { ShareStatementReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

const NewShareStatementReport = () => <ShareStatementReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
