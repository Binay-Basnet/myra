import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAllClosingDayListQuery } from '@coop/neosys-admin/data-access';

export const ClosingDayList = () => {
  const { data, isFetching } = useGetAllClosingDayListQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.closingDay?.fetchClosingDay?.records ?? [],
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
        header: 'Transaction Date',
        accessorFn: (row) => row?.transactionDate?.local,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Closing day list" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default ClosingDayList;
