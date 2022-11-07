import { ReactElement } from 'react';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { BranchLessBankingReport } from '@coop/cbs/reports/list';
import { MainLayout } from '@coop/shared/ui';

const LoanReports = () => <BranchLessBankingReport />;

LoanReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default LoanReports;
