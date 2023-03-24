import { useRouter } from 'next/router';

import { Box, Grid, Text } from '@myra-ui';

import { useGetMemberKymDetailsOverviewQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const MemberStatistics = () => {
  const router = useRouter();
  const memberDetails = useGetMemberKymDetailsOverviewQuery({
    id: router.query['id'] as string,
  });
  const memberShareDetails =
    memberDetails?.data?.members?.memberOverviewV2?.overview?.data?.statistics;
  return (
    <Grid templateColumns="repeat(3,1fr)" gap="s16">
      {memberShareDetails?.totalShareValue && (
        <Box boxShadow="E0" bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            Total Share Value
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {amountConverter(memberShareDetails?.totalShareValue)}
          </Text>
        </Box>
      )}
      {memberShareDetails?.accountBalance && (
        <Box boxShadow="E0" bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            Overall Account Balance
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {amountConverter(memberShareDetails?.accountBalance)}
          </Text>
        </Box>
      )}
      {memberShareDetails?.loanBalance && (
        <Box boxShadow="E0" bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            Total Loan Amount
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {amountConverter(memberShareDetails?.loanBalance as string)}
          </Text>
        </Box>
      )}
      {memberShareDetails?.totalSavingInterestAccured && (
        <Box boxShadow="E0" bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            Total Saving Interest Accrued
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {amountConverter(memberShareDetails?.totalSavingInterestAccured)}
          </Text>
        </Box>
      )}
      {memberShareDetails?.totalSavingInterestPosted && (
        <Box boxShadow="E0" bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            Total Saving Interest Posted
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {amountConverter(memberShareDetails?.totalSavingInterestPosted)}
          </Text>
        </Box>
      )}
      {memberShareDetails?.totalLoanInterest && (
        <Box boxShadow="E0" bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            Total Loan Interest Accrued
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {amountConverter(memberShareDetails?.totalLoanInterest as string)}
          </Text>
        </Box>
      )}
    </Grid>
  );
};
