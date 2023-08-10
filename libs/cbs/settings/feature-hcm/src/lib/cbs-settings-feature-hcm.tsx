import { Box, Divider, Text } from '@myra-ui';

import EmployeeHealthInsuranceTable from '../components/employee/EmployeeHealthInsuranceTable';
import EmployeeTypeTable from '../components/employee/EmployeeTypeTable';

export const CbsSettingsFeatureHcm = () => (
  <Box p="s16" display="flex" flexDir="column" gap="s16">
    <Text fontWeight="medium">Employee</Text>
    <Text fontSize="r1">
      All list of Day End History to view additional information for each day end process:
    </Text>
    <Divider />
    <Box display="flex" flexDir="column" flex={1} gap="s16">
      <EmployeeTypeTable />
      <EmployeeHealthInsuranceTable />
    </Box>
  </Box>
);

export default CbsSettingsFeatureHcm;
