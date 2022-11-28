import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Skeleton } from '@chakra-ui/react';

import { AccountCard, AccountHeaderCard } from '@coop/ebanking/cards';
import {
  AccountMinimal,
  useGetAccountListQuery,
  useGetEbankingLoanAccountsQuery,
} from '@coop/ebanking/data-access';
import { Box, Divider, Grid, Icon, Text } from '@myra-ui';

export const EbankingAccountsPage = () => {
  const router = useRouter();
  const { data: accountList, isLoading } = useGetAccountListQuery({
    transactionPagination: { first: 10, after: '' },
  });

  const { data: loanAccountList, isLoading: loanAccountLoading } = useGetEbankingLoanAccountsQuery(
    {}
  );

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <AccountHeaderCard />
      <Divider />
      <Box
        borderRadius="br2"
        h="40px"
        bg="primary.100"
        display="flex"
        alignItems="center"
        gap="s8"
        px="s16"
        color="primary.500"
      >
        <Icon as={InfoOutlineIcon} />
        <Text fontSize="s3">
          Find out more about our schemes and products that fit your needs.{' '}
          <Text
            as="span"
            cursor="pointer"
            fontWeight="600"
            onClick={() => router.push('/coop/products/deposit')}
          >
            Learn more
          </Text>
          .
        </Text>
      </Box>
      <Box>
        <Text fontSize="r1" color="gray.700" fontWeight="600" py="s16">
          Saving Accounts ({accountList?.eBanking?.account?.list?.accounts?.length})
        </Text>
        <Divider />
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap="s16">
        {isLoading && (
          <>
            <Skeleton h="144px" />
            <Skeleton h="144px" />
            <Skeleton h="144px" />
            <Skeleton h="144px" />
          </>
        )}
        {accountList?.eBanking?.account?.list?.accounts?.map((account) => (
          <Fragment key={account?.id}>
            <AccountCard
              account={account as AccountMinimal}
              isDefault={Boolean(account?.isDefault)}
            />
          </Fragment>
        ))}
      </Grid>

      <Box>
        <Text fontSize="r1" color="gray.700" fontWeight="600" py="s16">
          Loan Accounts ({loanAccountList?.eBanking?.loanAccount?.list?.accounts?.length})
        </Text>
        <Divider />
      </Box>

      <Grid templateColumns="repeat(2, 1fr)" gap="s16">
        {loanAccountLoading && (
          <>
            <Skeleton h="144px" />
            <Skeleton h="144px" />
            <Skeleton h="144px" />
            <Skeleton h="144px" />
          </>
        )}
        {loanAccountList?.eBanking?.loanAccount?.list?.accounts?.map((account) => (
          <Fragment key={account?.id}>
            <AccountCard
              isLoan
              account={account as AccountMinimal}
              isDefault={Boolean(account?.isDefault)}
            />
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default EbankingAccountsPage;
