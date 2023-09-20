import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAllErrorLogListQuery } from '@coop/neosys-admin/data-access';

export const ErrorLogList = () => {
  const { data, isFetching } = useGetAllErrorLogListQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.errorLog?.fetchErrorLog?.records ?? [],
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
        accessorFn: (row) => row?.saccosName,
      },
      {
        header: 'Log Message',
        accessorFn: (row) => row?.logMessage,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Error Log list" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default ErrorLogList;
