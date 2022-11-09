import { ReactElement } from 'react';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { LoanReportList } from '@coop/cbs/reports/list';
import { MainLayout } from '@coop/shared/ui';

const LoanReports = () => <LoanReportList />;

LoanReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default LoanReports;
