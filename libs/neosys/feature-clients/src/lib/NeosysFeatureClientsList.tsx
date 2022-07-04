import { Box } from '@coop/shared/ui';

import { ClientsTable } from './components';

/* eslint-disable-next-line */
export interface NeosysFeatureClientsListProps {}

export function NeosysFeatureClientsList(props: NeosysFeatureClientsListProps) {
  return (
    <Box bgColor="white" height="100vh">
      <ClientsTable />
    </Box>
  );
}

export default NeosysFeatureClientsList;
