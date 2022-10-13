import { ReactElement } from 'react';

import {
  AgentDetailPageLayout,
  TransactionsSidebarLayout,
} from '@coop/cbs/transactions/ui-layouts';
import { Box, MainLayout, WIPState } from '@coop/shared/ui';

const TransactionAgentDocuments = () => (
  <Box display="flex" justifyContent="center" alignItems="center">
    <WIPState />
  </Box>
);

TransactionAgentDocuments.getLayout = function getLayout(page: ReactElement) {
  return (
    <MainLayout>
      <TransactionsSidebarLayout>
        <AgentDetailPageLayout>{page}</AgentDetailPageLayout>
      </TransactionsSidebarLayout>
    </MainLayout>
  );
};
export default TransactionAgentDocuments;
