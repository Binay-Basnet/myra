import { Fragment } from 'react';
import { Skeleton } from '@chakra-ui/react';

import { AccountCard, AccountHeaderCard } from '@coop/ebanking/cards';
import { useGetAccountListQuery } from '@coop/shared/data-access';
import { Box, Divider, Grid } from '@coop/shared/ui';

export function EbankingAccountsPage() {
  const { data: accountList, isLoading } = useGetAccountListQuery();

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
        {accountList?.eBanking?.account?.list?.edges.map(
          ({ node: { isDefault, ...rest } }) => (
            <Fragment key={rest.id}>
              <AccountCard account={rest} isDefault={isDefault} />
            </Fragment>
          )
        )}
      </Grid>
    </Box>
  );
}

export default EbankingAccountsPage;
