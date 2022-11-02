import { useRouter } from 'next/router';

import { useGetMemberDetailsOverviewQuery } from '@coop/cbs/data-access';
import { Box, Grid, Text } from '@coop/shared/ui';

export const MemberStatistics = () => {
  const router = useRouter();
  const memberDetails = useGetMemberDetailsOverviewQuery({
    id: router.query['id'] as string,
  });
  const memberShareDetails =
    memberDetails?.data?.members?.memberOverview?.data?.overview?.statistics;
  return (
    <Grid templateColumns="repeat(3,1fr)" gap="s16">
      {memberShareDetails?.totalShareValue && (
        <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            Total Share Value
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {memberShareDetails?.totalShareValue}
          </Text>
        </Box>
      )}
      {memberShareDetails?.accountBalance && (
        <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            Overall Account Balance
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {memberShareDetails?.accountBalance}
          </Text>
        </Box>
      )}
      {memberShareDetails?.accountBalance && (
        <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            Total Loan Amount
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {memberShareDetails?.loanBalance}
          </Text>
        </Box>
      )}
    </Grid>
  );
};
