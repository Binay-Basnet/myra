import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { Button, DetailsCard } from '@myra-ui';

import { TransactionTable } from '@coop/cbs/components';
import {
  EbankingTransaction,
  ObjState,
  useAccountDetails,
  useGetAccountTransactionListsQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getRouterQuery } from '@coop/shared/utils';

import { TabHeader } from '../details';

export const Transactions = () => {
  const router = useRouter();

  const { accountDetails } = useAccountDetails();

  const { data: transactionListQueryData, isFetching } = useGetAccountTransactionListsQuery(
    {
      filter: { accountIds: [accountDetails?.accountId as string] },
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      enabled: !!accountDetails?.accountId,
    }
  );

  const transactionList = useMemo(
    () =>
      transactionListQueryData?.account?.listTransactions?.edges?.map(
        (item) => item?.node as EbankingTransaction
      ) ?? [],
    [transactionListQueryData]
  );

  const isClosed = accountDetails?.objState === ObjState?.Inactive;

  return (
    <>
      <TabHeader
        heading="Transaction"
        headerButton={
          <Button
            size="md"
            justifyContent="start"
            leftIcon={<AddIcon />}
            isDisabled={isClosed}
            onClick={() =>
              router.push(
                `${ROUTES.CBS_TRANS_DEPOSIT_ADD}?memberId=${accountDetails?.member?.id}&accountId=${accountDetails?.accountId}`
              )
            }
          >
            New Deposit
          </Button>
        }
      />

      <DetailsCard
        title={isClosed ? 'Past Transactions' : 'Recent Transactions'}
        bg="white"
        hasTable
      >
        <TransactionTable
          data={transactionList}
          isLoading={isFetching}
          pagination={{
            total: transactionListQueryData?.account?.listTransactions?.totalCount ?? 'Many',
            pageInfo: transactionListQueryData?.account?.listTransactions?.pageInfo,
          }}
        />
      </DetailsCard>
    </>
  );
};
