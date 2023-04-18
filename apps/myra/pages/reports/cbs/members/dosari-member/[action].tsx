import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { DosariMemberReport } from '@coop/cbs/reports';

const DosariMemberReportPage = () => <DosariMemberReport />;

export default DosariMemberReportPage;

DosariMemberReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
