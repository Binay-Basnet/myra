import { isEmpty } from 'lodash';

import { Box, Grid, Text } from '@myra-ui';

type StatsProps = {
  statsData: {
    title: string;
    value: string | 0;
  }[];
};

export const Statistics = ({ statsData }: StatsProps) => (
  <Grid templateColumns="repeat(3,1fr)" gap="s16">
    {statsData.map((summary) => (
      <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
        <Text fontSize="s2" fontWeight="Medium" lineHeight="125%" color="neutralColorLight.Gray-50">
          {summary.title}
        </Text>
        {summary?.title !== 'No of Collateral' && (
          <Text
            fontSize="r2"
            fontWeight="SemiBold"
            lineHeight="140%"
            color="neutralColorLight.Gray-70"
          >
            Rs. {!isEmpty(summary.value) ? summary.value : '0'}
          </Text>
        )}
        {summary?.title === 'No of Collateral' && (
          <Text
            fontSize="r2"
            fontWeight="SemiBold"
            lineHeight="140%"
            color="neutralColorLight.Gray-70"
          >
            {summary?.value}
          </Text>
        )}
      </Box>
    ))}
  </Grid>
);
