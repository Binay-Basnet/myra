import { Box, Grid, Text } from '@myra-ui';

import { amountConverter } from '@coop/shared/utils';

import { useCOAAccountDetails } from '../../hooks';

export const BalanceCard = () => {
  const { accountDetails } = useCOAAccountDetails();

  const accountSummary = [
    {
      title: 'Opening Balance',
      value: amountConverter(accountDetails?.overview?.openingBalance ?? 0),
    },
    {
      title: 'Transactions (Dr.)',
      value: amountConverter(accountDetails?.overview?.dr ?? 0),
    },
    {
      title: 'Transactions (Cr.)',
      value: amountConverter(accountDetails?.overview?.cr ?? 0),
    },
    {
      title: 'Closing Balance',
      value: amountConverter(accountDetails?.overview?.closingBalance ?? 0),
    },
  ];

  return (
    <Grid templateColumns="repeat(4,1fr)" gap="s16">
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
