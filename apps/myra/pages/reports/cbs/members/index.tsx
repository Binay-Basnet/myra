import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { MemberReportList } from '@coop/cbs/reports/list';

const MemberReports = () => <MemberReportList />;

MemberReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default MemberReports;
