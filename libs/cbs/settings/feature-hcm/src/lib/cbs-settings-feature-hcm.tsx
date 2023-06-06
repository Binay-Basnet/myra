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
    <Box display="flex">
      <Box display="flex" flexDir="column" flex={1} gap="s16" mr={200}>
        <DepartmentsTable />
        <DesignationsTable />
        <EmployeeTypeTable />
        <EmployeeHealthInsuranceTable />
      </Box>
      <Box position="fixed" right={0}>
        <Box display="flex" flexDir="column" minW="200" px="s16" gap="s16">
          <Text fontSize="r2" fontWeight="medium">
            On the Employee Settings
          </Text>
          <a href="#department">
            <Text fontSize="r1" fontWeight="medium" color="blue.500" cursor="pointer">
              Department
            </Text>
          </a>
          <a href="#designation">
            <Text fontSize="r1" fontWeight="medium" color="blue.500" cursor="pointer">
              Designation
            </Text>
          </a>
          <a href="#employee-type">
            <Text fontSize="r1" fontWeight="medium" color="blue.500" cursor="pointer">
              Employee Type
            </Text>
          </a>
          <a href="#employee-health-insurance">
            <Text fontSize="r1" fontWeight="medium" color="blue.500" cursor="pointer">
              Employee Health Insurance
            </Text>
          </a>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default CbsSettingsFeatureHcm;