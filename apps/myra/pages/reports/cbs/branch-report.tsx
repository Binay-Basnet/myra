import React, { ReactElement } from 'react';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { MainLayout } from '@coop/shared/ui';

const BranchReports = () => {
  return <>Branch Reports</>;
};

BranchReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default BranchReports;
