import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { DayBookReport, VaultBalanceReport } from '@coop/cbs/reports';

const DayBookReportPage = () => <DayBookReport />;

export default DayBookReportPage;

DayBookReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
