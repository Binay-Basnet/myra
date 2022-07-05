import { Box } from '@coop/shared/ui';

import { ClientsTable } from './components';

/* eslint-disable-next-line */
export interface NeosysFeatureClientsProps {}

export function NeosysFeatureClients(props: NeosysFeatureClientsProps) {
  return (
    <Box bgColor="white">
      <ClientsTable />
    </Box>
  );
}

export default NeosysFeatureClients;
