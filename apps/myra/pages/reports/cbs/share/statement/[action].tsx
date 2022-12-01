import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { ShareStatementReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <ShareStatementReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
