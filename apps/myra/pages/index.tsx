import { ReactElement } from 'react';

import { getNextDate } from '@myra-ui/date-picker';

import { CbsFeatureDashboard } from '@coop/cbs/dashboard';
import { HomePageLayout } from '@coop/myra/components';

const Dashboard = () => {
  console.log(getNextDate('month', 'BS', new Date()));
  return <CbsFeatureDashboard />;
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
export default Dashboard;
