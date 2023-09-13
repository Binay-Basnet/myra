import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetDatabaseSizeListQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const DatabaseSizeList = () => {
  const { data, isFetching } = useGetDatabaseSizeListQuery({
    pagination: { ...getPaginationQuery(), order: null },
  });

  const rowData = useMemo(
    () => data?.neosys?.thread?.databaseSize?.listDBSize?.edges ?? [],
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
        header: 'Database Size',
        accessorFn: (row) => row?.node?.databaseSize,
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
      <PageHeader heading="Database size list" />
      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.neosys?.thread?.databaseSize?.listDBSize?.totalCount as number,
          pageInfo: data?.neosys?.thread?.databaseSize?.listDBSize?.pageInfo,
        }}
      />
    </>
  );
};

export default DatabaseSizeList;
