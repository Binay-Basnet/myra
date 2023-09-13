import { ReactElement } from 'react';
import { AccessLogList } from '@neosys/feature-analytics';

import { AnalyticsSiderbar, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const AccessLogListPage = () => <AccessLogList />;

AccessLogListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AnalyticsSiderbar>{page}</AnalyticsSiderbar>
    </MainLayout>
  );
};
export default AccessLogListPage;
