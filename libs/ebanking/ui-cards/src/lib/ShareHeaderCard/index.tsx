import { AiOutlineStock } from 'react-icons/ai';
import { TbSum } from 'react-icons/tb';

import { Box, Grid, Icon, Text } from '@myra-ui';

import { useGetShareSummaryQuery } from '@coop/ebanking/data-access';

export const ShareHeader = () => {
  const { data: shareSummary } = useGetShareSummaryQuery();

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
      <Text variant="stickyCardHeader">My Share Information</Text>

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
            <Icon as={AiOutlineStock} color="primary.500" size="lg" />
          </Box>
          <Box display="flex" flexDir="column">
            <Text color="primary.200" variant="tableHeader">
              Total Shares
            </Text>
            <Text variant="stickyCardHeader">
              {shareSummary?.eBanking?.share?.summary?.totalShare ?? 'N/A'}
            </Text>
          </Box>
        </Box>
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
            <Icon as={TbSum} color="primary.500" size="lg" />
          </Box>
          <Box display="flex" gap="s4" flexDir="column">
            <Text color="primary.200" variant="tableHeader">
              Total Valuation
            </Text>
            {shareSummary?.eBanking?.share?.summary?.value ? (
              <Text variant="stickyCardHeader">
                Rs.{' '}
                {Number(shareSummary?.eBanking?.share?.summary?.value)?.toLocaleString('en-IN', {
                  maximumFractionDigits: 0,
                }) ?? 'N/A'}
              </Text>
            ) : (
              <Text variant="stickyCardHeader">N/A </Text>
            )}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
