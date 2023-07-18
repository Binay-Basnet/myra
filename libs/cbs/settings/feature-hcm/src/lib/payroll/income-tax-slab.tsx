import { Box, Divider, Text } from '@myra-ui';

import IncomeTaxSlabTable from '../../components/payroll/IncomeTaxSlabTable';

export const IncomeTaxSlab = () => (
  <Box p="s16" display="flex" flexDir="column" gap="s16">
    <Text fontWeight="medium">Taxable Salary Slab</Text>
    <Text fontSize="r1">Extend Fields that can be added to forms for additional Input Fields.</Text>
    <Divider />
    <Box display="flex">
      <Box display="flex" flexDir="column" flex={1} gap="s16">
        <IncomeTaxSlabTable />
      </Box>
    </Box>
  </Box>
);

export default IncomeTaxSlab;
