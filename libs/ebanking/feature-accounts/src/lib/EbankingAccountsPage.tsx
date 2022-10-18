import { Fragment } from 'react';
import { Skeleton } from '@chakra-ui/react';

import { AccountCard, AccountHeaderCard } from '@coop/ebanking/cards';
import { useGetAccountListQuery } from '@coop/ebanking/data-access';
import { Box, Divider, Grid } from '@coop/shared/ui';

export const EbankingAccountsPage = () => {
  const { data: accountList, isLoading } = useGetAccountListQuery({
    transactionPagination: { first: 10, after: '' },
  });

  return (
    <Box display="flex" flexDir="column" gap="s16">
      <AccountHeaderCard />
      <Divider />
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
              account={{
                id: account?.id,
                name: account?.name,
                balance: account?.balance,
                accountNumber: account?.accountNumber,
                interestRate: account?.interestRate,
              }}
              isDefault={Boolean(account?.isDefault)}
            />
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default EbankingAccountsPage;
