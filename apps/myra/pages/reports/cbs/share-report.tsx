import React, { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { ReportMainLayout, ReportsCbsLayout } from '@coop/cbs/reports/layout';
import { ShareReportList, ShareReportTable } from '@coop/cbs/reports/list';
import { MainLayout } from '@coop/shared/ui';

const ShareReport = () => {
  const router = useRouter();

  return (
    <>
      {router.query['objState'] !== 'table-view' ? (
        <ShareReportList />
      ) : (
        <ShareReportTable />
      )}
    </>
  );
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
