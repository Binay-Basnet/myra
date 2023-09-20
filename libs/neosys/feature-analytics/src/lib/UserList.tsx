import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAllUserCounterQuery } from '@coop/neosys-admin/data-access';

export const UserList = () => {
  const { data, isFetching } = useGetAllUserCounterQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.userCounter?.fetchUserCounter?.records ?? [],
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
        header: 'Approved User',
        accessorFn: (row) => row?.approvedUser,
      },
      {
        header: 'Inactive User',
        accessorFn: (row) => row?.inactiveUser,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Users" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default UserList;
