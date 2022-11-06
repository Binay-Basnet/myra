import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { SavingReportList, ShareReportTable } from '@coop/cbs/reports/list';
import { MainLayout } from '@coop/shared/ui';

const ShareReport = () => {
  const router = useRouter();

  if (router.query['objState'] !== 'table-view') {
    return <SavingReportList />;
  }

  return <ShareReportTable />;
};

ShareReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <ReportMainLayout>
        <ReportsCbsLayout>{page}</ReportsCbsLayout>
      </ReportMainLayout>
    </MainLayout>
  );
};
export default ShareReport;
