import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { DailyBalanceReport } from '@coop/cbs/reports';

const Report = () => <DailyBalanceReport />;

export default Report;

Report.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
