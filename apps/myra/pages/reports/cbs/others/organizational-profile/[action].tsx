import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { OrganizationalProfileReport } from '@coop/cbs/reports';

export const OrganzationalProfileReportPage = () => <OrganizationalProfileReport />;

export default OrganzationalProfileReportPage;

OrganzationalProfileReportPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
