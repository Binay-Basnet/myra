import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { LoanCollateralReport } from '@coop/cbs/reports';

export const LoanCollateralReportPage = () => <LoanCollateralReport />;

export default LoanCollateralReportPage;

LoanCollateralReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
