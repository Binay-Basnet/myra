import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { BranchReadinessReport } from '@coop/cbs/reports';

const BranchReadinessReportPage = () => <BranchReadinessReport />;

export default BranchReadinessReportPage;

BranchReadinessReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
