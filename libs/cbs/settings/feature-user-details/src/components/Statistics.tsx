import { Box, Grid, Text } from '@myra-ui';

import { useUserDetailsHooks } from '../hooks/useUserDetailsHooks';

export const UserStatistics = () => {
  const { userStats } = useUserDetailsHooks();

  return (
    <Grid templateColumns="repeat(3,1fr)" gap="s16">
      {userStats?.map((item) => (
        <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500" color="neutralColorLight.Gray-50">
            {item?.summary}
          </Text>
          <Text fontSize="r3" fontWeight="600" color="neutralColorLight.Gray-70">
            {item?.data}
          </Text>
        </Box>
      ))}
    </Grid>
  );
};
