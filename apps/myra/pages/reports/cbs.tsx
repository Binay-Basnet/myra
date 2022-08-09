import React, { ReactElement } from 'react';

import { ReportLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

const Reports = () => {
  return <div>Reports share share</div>;
};

Reports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportLayout>{page}</ReportLayout>
    </MainLayout>
  );
};
export default Reports;
