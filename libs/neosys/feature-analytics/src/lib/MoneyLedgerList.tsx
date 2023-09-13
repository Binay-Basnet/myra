import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetMoneyLedgerCounterQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const MoneyLedgerList = () => {
  const { data, isFetching } = useGetMoneyLedgerCounterQuery({
    pagination: { ...getPaginationQuery(), order: null },
  });

  const rowData = useMemo(
    () => data?.neosys?.thread?.moneyLedgerCounter?.listMoneyLedgerCounter?.edges ?? [],
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
        header: 'Money Ledger Count',
        accessorFn: (row) => row?.node?.moneyLedgerCount,
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
      <PageHeader heading="Money Ledgers" />
      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.neosys?.thread?.moneyLedgerCounter?.listMoneyLedgerCounter
            ?.totalCount as number,
          pageInfo: data?.neosys?.thread?.moneyLedgerCounter?.listMoneyLedgerCounter?.pageInfo,
        }}
      />
    </>
  );
};

export default MoneyLedgerList;
