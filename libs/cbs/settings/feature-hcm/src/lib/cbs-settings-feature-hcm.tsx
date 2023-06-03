import { Box, Divider, Text } from '@myra-ui';

import DepartmentsTable from '../components/DepartmentsTable';
import DesignationsTable from '../components/DesignationsTable';
import EmployeeHealthInsuranceTable from '../components/EmployeeHealthInsuranceTable';
import EmployeeTypeTable from '../components/EmployeeTypeTable';

export const CbsSettingsFeatureHcm = () => (
  <Box p="s16" display="flex" flexDir="column" gap="s16">
    <Text fontWeight="medium">Employee</Text>
    <Text fontSize="r1">
      All list of Day End History to view additional information for each day end process:
    </Text>
    <Divider />
    <DepartmentsTable />
    <DesignationsTable />
    <EmployeeTypeTable />
    <EmployeeHealthInsuranceTable />
  </Box>
);

export default CbsSettingsFeatureHcm;
