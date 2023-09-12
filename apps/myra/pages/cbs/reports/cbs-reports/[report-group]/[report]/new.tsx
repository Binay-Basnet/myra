import { ReactElement } from 'react';
import { useRouter } from 'next/router';

import { MainLayout, Scrollable } from '@myra-ui';

import { REPORTS } from '@coop/cbs/reports/list';

const NewShareBalanceReport = () => {
  const router = useRouter();
  const reportLink = router?.query['report'] as string;
  const reportGroup = router?.query['report-group'] as keyof typeof REPORTS;

  const report = REPORTS?.[reportGroup]?.find((d) => d?.link === reportLink);

  return 'component' in report ? report.component : 'sammer noob';
};

export default NewShareBalanceReport;

NewShareBalanceReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
