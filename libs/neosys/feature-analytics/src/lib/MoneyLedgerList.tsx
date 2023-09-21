import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAllMoneyLedgerCounterQuery } from '@coop/neosys-admin/data-access';

export const MoneyLedgerList = () => {
  const { data, isFetching } = useGetAllMoneyLedgerCounterQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.moneyLedgerCounter?.fetchMoneyLedgerCounter?.records ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Query Date',
        accessorFn: (row) => row?.queryDate?.local,
      },
      {
        header: 'Slug',
        accessorFn: (row) => row?.slug,
      },
      {
        header: 'Money Ledger Count',
        accessorFn: (row) => row?.moneyLedgerCount,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Money Ledgers" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default MoneyLedgerList;
