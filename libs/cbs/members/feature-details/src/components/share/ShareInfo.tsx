import { useRouter } from 'next/router';

import { Box, Grid, Text } from '@myra-ui';

import { useGetMemberKymDetailsSharesQuery } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const ShareInfo = () => {
  const router = useRouter();
  const memberDetails = useGetMemberKymDetailsSharesQuery({
    id: router.query['id'] as string,
  });
  const memberShareDetails = memberDetails?.data?.members?.memberOverviewV2?.share?.data?.shareInfo;
  return (
    <Grid templateColumns="repeat(4,1fr)" gap="s16">
      {memberShareDetails?.totalCount && (
        <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            {' '}
            Total Share Count
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {' '}
            {memberShareDetails?.totalCount}
          </Text>
        </Box>
      )}
      {memberShareDetails?.issuedCount && (
        <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            {' '}
            Share Issued
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {' '}
            {memberShareDetails?.issuedCount}
          </Text>
        </Box>
      )}
      {memberShareDetails?.returnedCount && (
        <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            {' '}
            Share Returned
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {' '}
            {memberShareDetails?.returnedCount}
          </Text>
        </Box>
      )}
      {memberShareDetails?.totalBalance && (
        <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500">
            {' '}
            Total Share Balance
          </Text>
          <Text fontSize="r3" fontWeight="600">
            {' '}
            {amountConverter(memberShareDetails?.totalBalance)}
          </Text>
        </Box>
      )}
    </Grid>
  );
};
