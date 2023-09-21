import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { AccountingLayout, AccountingReportsLayout } from '@coop/accounting/ui-layouts';
import { ReportsAccountingLayout } from '@coop/cbs/reports/layout';
import { ShareReportList, ShareReportTable } from '@coop/cbs/reports/list';

const ShareReport = () => {
  const router = useRouter();

  if (router.query['objState'] !== 'table-view') {
    return <ShareReportList module="ACCOUNTING" />;
  }

  return <ShareReportTable />;
};

ShareReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <AccountingLayout>
      {' '}
      <AccountingReportsLayout>
        <ReportsAccountingLayout>{page}</ReportsAccountingLayout>
      </AccountingReportsLayout>
    </AccountingLayout>
  );
};
export default ShareReport;
