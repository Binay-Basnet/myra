import { FaUsers } from 'react-icons/fa';
import { IoCashOutline } from 'react-icons/io5';

import { useAppSelector, useGetAccountSummaryQuery } from '@coop/ebanking/data-access';
import { Avatar, Box, Grid, Icon, TextFields } from '@coop/shared/ui';

export const COOPHeaderCard = () => {
  const { data: accountSummary } = useGetAccountSummaryQuery();

  const coop = useAppSelector((state) => state?.auth?.cooperative?.user);
  const myra = useAppSelector((state) => state?.auth);

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

        <TextFields variant="stickyCardHeader">{coop?.cooperativeName}</TextFields>
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
            <TextFields color="primary.200" variant="tableHeader">
              Members
            </TextFields>
            <TextFields variant="stickyCardHeader">
              {accountSummary?.eBanking?.account?.summary?.totalSaving.toLocaleString('en-IN', {
                maximumFractionDigits: 0,
              }) ?? 'N/A'}
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
            <Icon as={IoCashOutline} color="primary.500" size="lg" />
          </Box>
          <Box display="flex" gap="s4" flexDir="column">
            <TextFields color="primary.200" variant="tableHeader">
              Total Capital
            </TextFields>
            <TextFields variant="stickyCardHeader">
              {accountSummary?.eBanking?.account?.summary?.totalLoan.toLocaleString('en-IN', {
                maximumFractionDigits: 0,
              }) ?? 'N/A'}
            </TextFields>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
