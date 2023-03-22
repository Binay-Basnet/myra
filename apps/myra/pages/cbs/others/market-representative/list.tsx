import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';
import { AgentList } from '@coop/cbs/transactions/agent';

const FundManagementListPage = () => <AgentList />;

export default FundManagementListPage;

FundManagementListPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>{page}</OthersPageLayout>
    </MainLayout>
  );
};
