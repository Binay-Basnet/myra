import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { TrialSheetReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <TrialSheetReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
