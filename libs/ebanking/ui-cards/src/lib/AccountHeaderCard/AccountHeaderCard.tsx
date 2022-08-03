import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import { useGetAccountSummaryQuery } from '@coop/ebanking/data-access';
import { Box, Grid, Icon, TextFields } from '@coop/shared/ui';

export const AccountHeaderCard = () => {
  const { data: accountSummary } = useGetAccountSummaryQuery();

  return (
    <Box
      display="flex"
      flexDir="column"
      p="s16"
      bg="primary.500"
      color="white"
      gap="s24"
      borderRadius="br2"
    >
      <TextFields variant="stickyCardHeader">Accounts</TextFields>

      <Grid templateColumns="repeat(2, 1fr)" gap="s16">
        <Box display="flex" alignItems="center" gap="s12">
          <Box
            borderRadius="br2"
            bg="primary.100"
            w="s32"
            h="s32"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={AiOutlineArrowDown} color="primary.500" size="lg" />
          </Box>
          <Box display="flex" flexDir="column">
            <TextFields color="primary.200" variant="tableHeader">
              Total Saving
            </TextFields>
            <TextFields variant="stickyCardHeader">
              {accountSummary?.eBanking?.account?.summary?.totalSaving.toLocaleString(
                'en-IN',
                { maximumFractionDigits: 0 }
              ) ?? 'N/A'}
            </TextFields>
          </Box>
        </Box>
        <Box display="flex" alignItems="center" gap="s12">
          <Box
            borderRadius="br2"
            bg="danger.100"
            w="s32"
            h="s32"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={AiOutlineArrowUp} color="danger.500" size="lg" />
          </Box>
          <Box display="flex" gap="s4" flexDir="column">
            <TextFields color="primary.200" variant="tableHeader">
              Total Loan
            </TextFields>
            <TextFields variant="stickyCardHeader">
              {accountSummary?.eBanking?.account?.summary?.totalLoan.toLocaleString(
                'en-IN',
                { maximumFractionDigits: 0 }
              ) ?? 'N/A'}
            </TextFields>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
