import { Box } from '@myra-ui';

import PayGroupTable from '../../components/payroll/PayGroupTable';

export const PayGroup = () => (
  <Box p="s16" display="flex" flexDir="column" gap="s16">
    <PayGroupTable />
  </Box>
);

export default PayGroup;
