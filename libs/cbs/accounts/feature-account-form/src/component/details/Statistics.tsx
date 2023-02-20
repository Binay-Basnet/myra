import { Box, Grid, Text } from '@myra-ui';

import { ObjState, useAccountDetails } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const AccountStatistics = () => {
  const { accountDetails } = useAccountDetails();
  const isClosed = accountDetails?.objState === ObjState?.Inactive;

  const accountSummary = [
    {
      title: isClosed ? 'Closing Balance' : 'Available Balance',
      value: isClosed
        ? amountConverter(accountDetails?.accountBalance ?? 0)
        : amountConverter(accountDetails?.availableBalance ?? 0),
    },
    {
      title: isClosed ? 'Total Deposit Balance' : 'Actual Balance',
      value: amountConverter(accountDetails?.accountBalance ?? 0),
    },
  ];

  return (
    <Grid templateColumns="repeat(2,1fr)" gap="s16">
      {accountSummary.map((summary) => (
        <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
          <Text fontSize="s3" fontWeight="500" color="neutralColorLight.Gray-50">
            {summary.title}
          </Text>
          <Text fontSize="r3" fontWeight="600" color="neutralColorLight.Gray-70">
            {summary.value}
          </Text>
        </Box>
      ))}
    </Grid>
  );
};
