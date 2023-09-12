import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAccessLogCounterListQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const AccessLogList = () => {
  const { data, isFetching } = useGetAccessLogCounterListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.neosys?.thread?.accessLogCounter?.listAccessLogCounter?.edges ?? [],
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
        header: 'Query Success',
        accessorFn: (row) => row?.node?.querySuccess,
      },
      {
        header: 'Query Failed',
        accessorFn: (row) => row?.node?.queryFailed,
      },
      {
        header: 'Mutation Success',
        accessorFn: (row) => row?.node?.mutationSuccess,
      },
      {
        header: 'Mutation Failed',
        accessorFn: (row) => row?.node?.mutationFailed,
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
      <PageHeader heading="Access Log list" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default AccessLogList;
