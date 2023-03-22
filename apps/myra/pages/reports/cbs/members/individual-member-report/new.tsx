import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { IndividualMemberReport } from '@coop/cbs/reports';

const IndividualMemberReportPage = () => <IndividualMemberReport />;

export default IndividualMemberReportPage;

IndividualMemberReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
