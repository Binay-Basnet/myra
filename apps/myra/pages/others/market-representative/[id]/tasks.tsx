import { ReactElement } from 'react';

import { Box, MainLayout, WIPState } from '@myra-ui';

import { OthersPageLayout } from '@coop/cbs/others/ui-layouts';
import { AgentDetailPageLayout } from '@coop/cbs/transactions/ui-layouts';

const TransactionAgentTasks = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

TransactionAgentTasks.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <OthersPageLayout>
        <AgentDetailPageLayout>{page}</AgentDetailPageLayout>
      </OthersPageLayout>
    </MainLayout>
  );
};
export default TransactionAgentTasks;
