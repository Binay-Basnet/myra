import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAllAccessLogCounterListQuery } from '@coop/neosys-admin/data-access';

export const AccessLogList = () => {
  const { data, isFetching } = useGetAllAccessLogCounterListQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.accessLogCounter?.fetchAccessLogCounter?.records ?? [],
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
        header: 'Query Success',
        accessorFn: (row) => row?.querySuccess,
      },
      {
        header: 'Query Failed',
        accessorFn: (row) => row?.queryFailed,
      },
      {
        header: 'Mutation Success',
        accessorFn: (row) => row?.mutationSuccess,
      },
      {
        header: 'Mutation Failed',
        accessorFn: (row) => row?.mutationFailed,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Access Log list" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default AccessLogList;
