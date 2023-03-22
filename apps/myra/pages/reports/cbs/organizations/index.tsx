import { ReactElement } from 'react';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { OrganizationReportList } from '@coop/cbs/reports/list';
import { MainLayout, Scrollable } from '@myra-ui';

const OrganizationReportListPage = () => <OrganizationReportList />;

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
