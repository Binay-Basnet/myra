import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ABBSStatusReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <ABBSStatusReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
