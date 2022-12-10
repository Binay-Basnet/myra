import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, Table } from '@myra-ui/table';

import { useGetAllTransactionsListQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface DepositListProps {}

export const AllTransactionsList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data, isFetching } = useGetAllTransactionsListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const rowData = useMemo(() => data?.transaction?.listAllTransactions?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['depositListTransactionId'],
        accessorFn: (row) => row?.node?.id,
      },
      {
        accessorFn: (row) => row?.node?.transactionType,
        header: 'Type',

        meta: {
          width: '60%',
        },
      },
      {
        header: 'Narration',
        accessorFn: (row) => row?.node?.narration,
      },

      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Date',
        accessorFn: (row) => row?.node?.date?.local?.split(' ')[0] ?? 'N/A',
      },
    ],
    [t]
  );

  return (
    <>
      <TransactionPageHeader heading="All Transactions" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) => router.push(`/transactions/deposit/view?id=${row?.node?.id}`)}
        pagination={{
          total: data?.transaction?.listAllTransactions?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listAllTransactions?.pageInfo,
        }}
        searchPlaceholder="Search all transactions"
      />
    </>
  );
};

export default AllTransactionsList;
