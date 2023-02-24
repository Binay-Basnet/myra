import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { IndividualMemberReport } from '@coop/cbs/reports';

const IndividualMemberReportPage = () => <IndividualMemberReport />;

export default IndividualMemberReportPage;

IndividualMemberReportPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
