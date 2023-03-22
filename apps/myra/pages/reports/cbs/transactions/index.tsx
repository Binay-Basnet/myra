import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { TransactionReportList } from '@coop/cbs/reports/list';

const LoanReports = () => <TransactionReportList />;

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
