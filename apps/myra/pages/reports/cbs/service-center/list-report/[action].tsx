import { ReactElement } from 'react';

import { ServiceCenterListReport } from '@coop/cbs/reports';
import { MainLayout } from '@myra-ui';

const NewShareStatementReport = () => <ServiceCenterListReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
