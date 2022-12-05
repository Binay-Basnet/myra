import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import { Box, Grid, Icon, Text } from '@myra-ui';

import {
  useGetAccountListQuery,
  useGetEbankingLoanAccountsQuery,
} from '@coop/ebanking/data-access';

export const AccountHeaderCard = () => {
  const { data: accountList } = useGetAccountListQuery({
    transactionPagination: { first: 10, after: '' },
  });

  const { data: loanAccountList } = useGetEbankingLoanAccountsQuery({});

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
      <Text variant="stickyCardHeader">Accounts</Text>

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
            <Text color="primary.200" variant="tableHeader">
              Total Saving
            </Text>
            <Text variant="stickyCardHeader">
              {Number(accountList?.eBanking?.account?.list?.totalBalance)?.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
              }) ?? 'N/A'}
            </Text>
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
            <Text color="primary.200" variant="tableHeader">
              Total Loan
            </Text>
            <Text variant="stickyCardHeader">
              {Number(loanAccountList?.eBanking?.loanAccount?.list?.totalBalance)?.toLocaleString(
                'en-IN',
                {
                  maximumFractionDigits: 2,
                }
              ) ?? 'N/A'}
            </Text>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
