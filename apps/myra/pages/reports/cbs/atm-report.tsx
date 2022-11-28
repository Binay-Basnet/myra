import { ReactElement } from 'react';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { ATMReport } from '@coop/cbs/reports/list';
import { MainLayout } from '@myra-ui';

const ATMReportsPage = () => <ATMReport />;

ATMReportsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default ATMReportsPage;
