import React, { ReactElement } from 'react';

import { ReportMainLayout } from '@coop/cbs/reports/layout';
import { MainLayout } from '@coop/shared/ui';

const ReportsSaved = () => {
  return <div>Reports share share</div>;
};

ReportsSaved.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>{page}</ReportMainLayout>
    </MainLayout>
  );
};
export default ReportsSaved;
