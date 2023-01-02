import { ReactElement } from 'react';
import { MainLayout } from '@myra-ui';

import { TellerReport } from '@coop/cbs/reports';

const ReportPage = () => <TellerReport />;

export default ReportPage;

ReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
