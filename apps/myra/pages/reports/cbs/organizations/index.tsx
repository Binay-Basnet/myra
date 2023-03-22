import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { OrganizationReportList } from '@coop/cbs/reports/list';

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
