import { ReactElement } from 'react';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { SavingReportList } from '@coop/cbs/reports/list';
import { MainLayout } from '@myra-ui';

const DepositReports = () => <SavingReportList />;

DepositReports.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default DepositReports;
