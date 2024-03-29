import { Box, Grid, Text } from '@myra-ui';

import { AgeCharts } from './AgeCharts';
import { TypeCharts } from './TypeCharts';

export const DashboardCharts = () => (
  <Box display="flex" flexDirection="column" gap="s16" borderRadius="br2">
    {/* <Box display="flex" gap="s16">
      <DetailCardStats
        title="Total Deposits"
        stats="74,00,345.00"
        meta={{ growth: 200, time: 'Yesterday' }}
      />
      <DetailCardStats
        title="Total Deposits"
        stats="74,00,345.00"
        meta={{ growth: 200, time: 'Yesterday' }}
      />
    </Box> */}

    <Grid templateColumns="repeat(2,1fr)" gap="s16">
      <Box
        boxShadow="E0"
        bg="white"
        p="s16"
        display="flex"
        flexDirection="column"
        gap="s16"
        borderRadius="6px"
      >
        <Text fontSize="r1" fontWeight="Medium">
          Member Categorization By Age
        </Text>
        <AgeCharts />
      </Box>

      <Box
        boxShadow="E0"
        bg="white"
        p="s16"
        display="flex"
        flexDirection="column"
        gap="s16"
        borderRadius="6px"
      >
        <Text fontSize="r1" fontWeight="Medium">
          Member Categorization By Type
        </Text>
        <TypeCharts />
      </Box>
    </Grid>
  </Box>
);
