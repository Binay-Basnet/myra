import { Box, Grid, Text } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

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
        <Text
          fontSize="r2"
          fontWeight="SemiBold"
          lineHeight="140%"
          color="neutralColorLight.Gray-70"
        >
          Rs. {amountConverter(summary.value)}
        </Text>
      </Box>
    ))}
  </Grid>
);
