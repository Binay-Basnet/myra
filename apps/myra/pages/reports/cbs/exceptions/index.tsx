import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { ExceptionReportList } from '@coop/cbs/reports/list';

const ExceptionReports = () => <ExceptionReportList />;

ExceptionReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default ExceptionReports;
