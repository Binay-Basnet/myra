import { ReactElement } from 'react';
import { ErrorLogList } from '@neosys/feature-analytics';

import { AnalyticsSiderbar, MainLayout } from '@coop/neosys-admin/layout';
// import { MainLayout } from '@coop/shared/ui';

const ErrorLogListPage = () => <ErrorLogList />;

ErrorLogListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <AnalyticsSiderbar>{page}</AnalyticsSiderbar>
    </MainLayout>
  );
};
export default ErrorLogListPage;
