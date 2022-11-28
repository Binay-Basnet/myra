import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { ShareRegisterReport } from '@coop/cbs/reports';

const NewShareStatementReport = () => <ShareRegisterReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
