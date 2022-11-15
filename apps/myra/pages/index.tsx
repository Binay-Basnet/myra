import { ReactElement } from 'react';

import { CbsFeatureDashboard } from '@coop/cbs/dashboard';
import { HomePageLayout } from '@coop/myra/components';

const Dashboard = () => <CbsFeatureDashboard />;

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <HomePageLayout>{page}</HomePageLayout>;
};
export default Dashboard;
