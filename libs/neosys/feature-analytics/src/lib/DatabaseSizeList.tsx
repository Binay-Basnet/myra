import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAllDatabaseSizeListQuery } from '@coop/neosys-admin/data-access';

export const DatabaseSizeList = () => {
  const { data, isFetching } = useGetAllDatabaseSizeListQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.databaseSize?.fetchDatabaseSize?.records ?? [],
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
        header: 'Database Size',
        accessorFn: (row) => row?.databaseSize,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Database size list" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default DatabaseSizeList;
