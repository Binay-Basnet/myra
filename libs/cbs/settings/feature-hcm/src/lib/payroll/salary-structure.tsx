import { Box, Divider, Text } from '@myra-ui';

import SalaryStructureTable from '../../components/payroll/SalaryStructureTable';

export const SalaryStructure = () => (
  <Box p="s16" display="flex" flexDir="column" gap="s16">
    <Text fontWeight="medium">Salary Structure</Text>
    <Text fontSize="r1">
      Salary paid to the employees comprises of several different components, such as basic salary,
      allowances, arrears, etc.
    </Text>
    <Divider />
    <SalaryStructureTable />
  </Box>
);

export default SalaryStructure;
