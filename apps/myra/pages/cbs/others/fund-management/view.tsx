import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { NewFundManagement } from '@coop/cbs/others/fund-management';

const FundManagementViewPage = () => <NewFundManagement />;

export default FundManagementViewPage;

FundManagementViewPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <Scrollable>{page}</Scrollable>
    </MainLayout>
  );
};
