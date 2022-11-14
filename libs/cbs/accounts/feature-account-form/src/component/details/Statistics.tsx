import { Box, Grid, Text } from '@coop/shared/ui';
import { amountConverter, useAccountDetails } from '@coop/shared/utils';

export const AccountStatistics = () => {
  const { accountDetails } = useAccountDetails();

  const accountSummary = [
    {
      title: 'Overall Account Balance',
      value: amountConverter(accountDetails?.accountBalance ?? 0),
    },
    {
      title: 'Total Deposit Balance',
      value: amountConverter(accountDetails?.totalDepositBalance ?? 0),
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
