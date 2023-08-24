import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { FundManagementList } from '@coop/cbs/others/fund-management';
import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';

const FundManagementListPage = () => <FundManagementList />;

export default FundManagementListPage;

FundManagementListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};
