import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

import { useGetAllTransactionsListQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface DepositListProps {}

export const AllTransactionsList = () => {
  const { t } = useTranslation();

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
      },
      {
        header: 'Narration',
        accessorFn: (row) => row?.node?.narration,
      },

      {
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
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
