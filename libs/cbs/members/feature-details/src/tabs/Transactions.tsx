import { useMemo } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import { Box, DetailsCard, Grid, Icon, Text } from '@myra-ui';

import { TransactionTable } from '@coop/cbs/components';
import { EbankingTransaction, useGetAccountTransactionListsQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getRouterQuery } from '@coop/shared/utils';

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
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
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
      <Box display="flex" flexDirection="column" gap="s16" pb="s16">
        <Text fontWeight="600" fontSize="r1">
          Quick Links
        </Text>
        <Grid templateColumns="repeat(3,1fr)" gap="s16">
          {links?.map((item) => (
            <Box key={`${item.link}${item.title}`}>
              <Box
                display="flex"
                justifyContent="flex-start"
                alignItems="center"
                bg="white"
                borderRadius="br2"
                gap="s12"
                h="58px"
                pl="s16"
                cursor="pointer"
                onClick={() => router.push(`${item.link}`)}
              >
                <Icon as={IoAddOutline} />

                <Text fontWeight="500" fontSize="s3">
                  {item.title}
                </Text>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>

      <DetailsCard title="Recent Transactions" hasTable>
        <TransactionTable data={transactionList} hasIndex />
      </DetailsCard>
    </>
  );
};
