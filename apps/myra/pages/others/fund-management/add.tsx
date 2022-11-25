import { ReactElement } from 'react';

import { NewFundManagement } from '@coop/cbs/others/fund-management';
import { MainLayout } from '@coop/shared/ui';

const FundManagementAddPage = () => <NewFundManagement />;

export default FundManagementAddPage;

FundManagementAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
