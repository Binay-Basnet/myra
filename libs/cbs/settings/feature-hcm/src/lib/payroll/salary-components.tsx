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
    <Box display="flex">
      <Box display="flex" flexDir="column" flex={1} gap="s16" mr={200}>
        <EarningComponentTable />
        <DeductionComponentTable />
      </Box>
      <Box position="fixed" right={0}>
        <Box display="flex" flexDir="column" minW="200" px="s16" gap="s16">
          <Text fontSize="r2" fontWeight="medium">
            On the Employee Settings
          </Text>
          <a href="#employee-level">
            <Text fontSize="r1" fontWeight="medium" color="blue.500" cursor="pointer">
              Earning Component
            </Text>
          </a>
          <a href="#department">
            <Text fontSize="r1" fontWeight="medium" color="blue.500" cursor="pointer">
              Deduction Component
            </Text>
          </a>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default SalaryComponents;
