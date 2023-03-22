import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { ReportMainLayout } from '@coop/cbs/reports/layout';
import { SavedReportList } from '@coop/cbs/reports/list';

const ReportsSaved = () => <SavedReportList />;

ReportsSaved.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>{page}</ReportMainLayout>
    </MainLayout>
  );
};
export default ReportsSaved;
