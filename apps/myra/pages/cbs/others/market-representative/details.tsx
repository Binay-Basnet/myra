import { ReactElement } from 'react';

import { MainLayout, Scrollable } from '@myra-ui';

import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';
import { AgentDetails } from '@coop/cbs/transactions/agent';
import { AgentDetailPageLayout } from '@coop/cbs/transactions/ui-layouts';

const TransactionAgentDocuments = () => <AgentDetails />;
TransactionAgentDocuments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>
        <AgentDetailPageLayout>{page}</AgentDetailPageLayout>
      </OthersPageLayout>
    </MainLayout>
  );
};
export default TransactionAgentDocuments;
