import React, { ReactElement } from 'react';

import { ReportLayout } from '@coop/myra/components';
import { MainLayout } from '@coop/shared/ui';

const ReportsSaved = () => {
  return <div>Reports share share</div>;
};

ReportsSaved.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportLayout>{page}</ReportLayout>
    </MainLayout>
  );
};
export default ReportsSaved;
