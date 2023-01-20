import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { NewFundManagement } from '@coop/cbs/others/fund-management';

const FundManagementAddPage = () => <NewFundManagement />;

export default FundManagementAddPage;

FundManagementAddPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
