import { ReactElement } from 'react';

import { ServiceCenterReport } from '@coop/cbs/reports';
import { MainLayout } from '@coop/shared/ui';

const NewShareStatementReport = () => <ServiceCenterReport />;

export default NewShareStatementReport;

NewShareStatementReport.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
