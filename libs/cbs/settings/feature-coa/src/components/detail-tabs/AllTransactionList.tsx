import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { DetailsCard } from '@myra-ui';

import { TransactionTable } from '@coop/cbs/components';
import {
  EbankingTransaction,
  useGetCoaAccountsAllTransactionListQuery,
} from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const Transactions = () => {
  const router = useRouter();

  const tabId = router.query['id'] as string;
  const { data: transactionListQueryData, isFetching } = useGetCoaAccountsAllTransactionListQuery({
    pagination: getPaginationQuery(),
    id: tabId,
  });

  const transactionList = useMemo(
    () =>
      transactionListQueryData?.settings?.chartsOfAccount?.ledgerAllTransactionsList?.edges?.map(
        (item) =>
          ({
            date: item?.node?.date,
            transactionId: item?.node?.txnId,
            transactionType: item?.node?.txnType,
            name: item?.node?.particulars,
            debit: item?.node?.debit,
            credit: item?.node?.credit,
            currentBalance: item?.node?.total,
            balanceType: item?.node?.balanceType,
          } as EbankingTransaction)
      ) ?? [],
    [transactionListQueryData]
  );

  return (
    <DetailsCard title="ALL TRANSACTIONS" bg="white" hasTable>
      <TransactionTable
        data={transactionList}
        isLoading={isFetching}
        pagination={{
          total:
            transactionListQueryData?.settings?.chartsOfAccount?.ledgerAllTransactionsList
              ?.totalCount ?? 'Many',
          pageInfo:
            transactionListQueryData?.settings?.chartsOfAccount?.ledgerAllTransactionsList
              ?.pageInfo,
        }}
      />
    </DetailsCard>
  );
};
