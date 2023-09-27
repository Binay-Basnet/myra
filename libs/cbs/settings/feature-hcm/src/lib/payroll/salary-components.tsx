import { Box, Divider, Text } from '@myra-ui';

import DeductionComponentTable from '../../components/payroll/DeductionComponentTable';
import EarningComponentTable from '../../components/payroll/EarningComponentTable';

export const SalaryComponents = () => (
  <Box p="s16" display="flex" flexDir="column" gap="s16">
    <Text fontWeight="medium">Salary Components</Text>
    <Text fontSize="r1">
      Salary paid to the employees comprises of several different components, such as basic salary,
      allowances, arrears, etc.
    </Text>
    <Divider />

    <Box display="flex" flexDir="column" flex={1} gap="s16">
      <EarningComponentTable />
      <DeductionComponentTable />
    </Box>
  </Box>
);

export default SalaryComponents;
