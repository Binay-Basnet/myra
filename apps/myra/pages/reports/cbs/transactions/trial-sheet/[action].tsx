import { ReactElement } from 'react';

import { TrialSheetReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

const NewShareStatementReport = () => <TrialSheetReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
