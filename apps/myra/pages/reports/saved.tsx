import React, { ReactElement } from 'react';

import { ReportMainLayout } from '@coop/cbs/reports/layout';
import { SavedReportList } from '@coop/cbs/reports/list';
import { MainLayout } from '@coop/shared/ui';

const ReportsSaved = () => {
  return (
    <>
      <SavedReportList />
    </>
  );
};

ReportsSaved.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>{page}</ReportMainLayout>
    </MainLayout>
  );
};
export default ReportsSaved;
