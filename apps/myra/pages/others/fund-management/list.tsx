import { ReactElement } from 'react';

import { FundManagementList } from '@coop/cbs/others/fund-management';
import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';
import { MainLayout } from '@myra-ui';

const FundManagementListPage = () => <FundManagementList />;

export default FundManagementListPage;

FundManagementListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};
