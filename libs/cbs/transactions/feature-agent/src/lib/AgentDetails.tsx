import { useRouter } from 'next/router';

import { Scrollable } from '@myra-ui';

import { AgentAssignedMembers } from './AgentAssignedMembers';
import { AgentDetailOverview } from './AgentDetailOverview';

export const AgentDetails = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  return (
    <Scrollable detailPage>
      {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && (
        <AgentDetailOverview />
      )}

      {tabQuery === 'assigned members' && <AgentAssignedMembers />}

      {/* {tabQuery === 'accounts' && <Account />}
        {tabQuery === 'activity' && <Activity />}
        {tabQuery === 'bio' && <Bio />}
        {tabQuery === 'cheque' && <Cheque />}
        {tabQuery === 'documents' && <Documents />}
        {tabQuery === 'reports' && <Reports />}
        {tabQuery === 'share' && <Share />}
        {tabQuery === 'tasks' && <Tasks />}
        {tabQuery === 'transactions' && <Transactions />} */}
    </Scrollable>
  );
};
