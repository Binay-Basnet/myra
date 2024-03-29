import { FaUsers } from 'react-icons/fa';
import { IoCashOutline } from 'react-icons/io5';

import { Avatar, Box, Grid, Icon, Text } from '@myra-ui';

import { useAppSelector, useGetCoopStatsQuery } from '@coop/ebanking/data-access';
import { amountConverter } from '@coop/shared/utils';

export const COOPHeaderCard = () => {
  const { data: coopStatsData } = useGetCoopStatsQuery();

  const coop = useAppSelector((state) => state?.auth?.cooperative?.user);
  const myra = useAppSelector((state) => state?.auth);

  const coopStats = coopStatsData?.eBanking?.cooperativeServices?.coopStatistics;

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
      <Box display="flex" alignItems="center" gap="s12">
        <Avatar
          name={coop?.cooperativeName as string}
          w="s48"
          h="s48"
          src={
            myra?.user?.cooperatives?.find((c) => c?.id === coop?.cooperativeId)?.logoUrl as string
          }
        />

        <Text variant="stickyCardHeader" textTransform="capitalize">
          {coop?.cooperativeName}
        </Text>
      </Box>

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
            <Icon as={FaUsers} color="primary.500" size="sm" />
          </Box>
          <Box display="flex" flexDir="column">
            <Text color="primary.200" variant="tableHeader">
              Members
            </Text>
            <Text variant="stickyCardHeader">{coopStats?.totalMembers}</Text>
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
            <Icon as={IoCashOutline} color="primary.500" size="lg" />
          </Box>
          <Box display="flex" gap="s4" flexDir="column">
            <Text color="primary.200" variant="tableHeader">
              Total Capital
            </Text>
            <Text variant="stickyCardHeader">
              {coopStats?.totalCapital ? amountConverter(coopStats?.totalCapital) : 'N/A'}
            </Text>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
