import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetUserCounterQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const UserList = () => {
  const { data, isFetching } = useGetUserCounterQuery({
    pagination: { ...getPaginationQuery(), order: null },
  });

  const rowData = useMemo(
    () => data?.neosys?.thread?.userCounter?.listUserCounter?.edges ?? [],
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
        header: 'Approved User',
        accessorFn: (row) => row?.node?.approvedUser,
      },
      {
        header: 'Inactive User',
        accessorFn: (row) => row?.node?.inactiveUser,
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
      <PageHeader heading="Users" />
      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.neosys?.thread?.userCounter?.listUserCounter?.totalCount as number,
          pageInfo: data?.neosys?.thread?.userCounter?.listUserCounter?.pageInfo,
        }}
      />
    </>
  );
};

export default UserList;
