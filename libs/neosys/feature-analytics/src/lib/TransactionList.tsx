import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetTransactionCounterQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const TransactionList = () => {
  const { data, isFetching } = useGetTransactionCounterQuery({
    pagination: { ...getPaginationQuery(), order: null },
  });

  const rowData = useMemo(
    () => data?.neosys?.thread?.transactionCounter?.listTransactionCounter?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Id',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Created at',
        accessorFn: (row) => row?.node?.createdAt,
      },
      {
        header: 'Txn Count',
        accessorFn: (row) => row?.node?.txnCount,
      },

      {
        header: 'Slug',
        accessorFn: (row) => row?.node?.slug,
      },
      {
        header: 'Query Id',
        accessorFn: (row) => row?.node?.queryID,
      },
      {
        header: 'Query Date',
        accessorFn: (row) => row?.node?.queryDate?.local,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Transactions" />
      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.neosys?.thread?.transactionCounter?.listTransactionCounter
            ?.totalCount as number,
          pageInfo: data?.neosys?.thread?.transactionCounter?.listTransactionCounter?.pageInfo,
        }}
      />
    </>
  );
};

export default TransactionList;
