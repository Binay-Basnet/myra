import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, DetailPageQuickLinks, DetailsCard, Text } from '@myra-ui';

import { TransactionTable } from '@coop/cbs/components';
import { EbankingTransaction, useGetAccountTransactionListsQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const Transactions = () => {
  const router = useRouter();
  const id = router.query['id'] as string;
  const links = [
    {
      title: 'New Deposit',
      link: `${ROUTES.CBS_TRANS_DEPOSIT_ADD}?memberId=${id}`,
    },
    {
      title: 'New Withdraw',
      link: `${ROUTES.CBS_TRANS_WITHDRAW_ADD}?memberId=${id}`,
    },
    {
      title: 'Transfer',
      link: `${ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_ADD}?memberId=${id}`,
    },
  ];

  const { data: transactionListQueryData } = useGetAccountTransactionListsQuery(
    {
      filter: { memberIds: [id as string] },
      pagination: getPaginationQuery(),
    },
    {
      enabled: !!id,
    }
  );

  const transactionList = useMemo(
    () =>
      transactionListQueryData?.account?.listTransactions?.edges?.map(
        (item) => item?.node as EbankingTransaction
      ) ?? [],
    [transactionListQueryData]
  );

  return (
    <>
      <Text fontSize="r3" fontWeight="600">
        Transactions
      </Text>
      <Box display="flex" flexDirection="column" gap="s16">
        <DetailPageQuickLinks links={links} />
      </Box>

      <DetailsCard title="Recent Transactions" hasTable>
        <TransactionTable data={transactionList} />
      </DetailsCard>
    </>
  );
};
