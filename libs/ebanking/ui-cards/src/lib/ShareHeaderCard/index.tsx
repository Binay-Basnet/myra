import { AiOutlineStock } from 'react-icons/ai';
import { TbSum } from 'react-icons/tb';

import { useGetShareSummaryQuery } from '@coop/ebanking/data-access';
import { Box, Grid, Icon, TextFields } from '@coop/shared/ui';

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
      <TextFields variant="stickyCardHeader">My Share Information</TextFields>

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
            <TextFields color="primary.200" variant="tableHeader">
              Total Shares
            </TextFields>
            <TextFields variant="stickyCardHeader">
              {shareSummary?.eBanking?.share?.summary?.totalShare ?? 'N/A'}
            </TextFields>
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
            <TextFields color="primary.200" variant="tableHeader">
              Total Valuation
            </TextFields>
            {shareSummary?.eBanking?.share?.summary?.value ? (
              <TextFields variant="stickyCardHeader">
                Rs.{' '}
                {Number(shareSummary?.eBanking?.share?.summary?.value)?.toLocaleString('en-IN', {
                  maximumFractionDigits: 0,
                }) ?? 'N/A'}
              </TextFields>
            ) : (
              <TextFields variant="stickyCardHeader">N/A </TextFields>
            )}
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
