import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { DormantAccountsReport } from '@coop/cbs/reports';

export const DormantAccountReport = () => <DormantAccountsReport />;

export default DormantAccountReport;

DormantAccountReport.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
