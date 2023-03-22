import { ReactElement } from 'react';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { OthersReportList } from '@coop/cbs/reports/list';
import { MainLayout, Scrollable } from '@myra-ui';

const OrganizationReportListPage = () => <OthersReportList />;

OrganizationReportListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default OrganizationReportListPage;
