import { ReactElement } from 'react';

import { MainLayout } from '@myra-ui';

import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';
import { AgentDetailOverview } from '@coop/cbs/transactions/agent';
import { AgentDetailPageLayout } from '@coop/cbs/transactions/ui-layouts';

const TransactionAgentDetailOverview = () => <AgentDetailOverview />;

TransactionAgentDetailOverview.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>
        <AgentDetailPageLayout>{page}</AgentDetailPageLayout>
      </OthersPageLayout>
    </MainLayout>
  );
};
export default TransactionAgentDetailOverview;
