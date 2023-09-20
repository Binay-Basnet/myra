import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetAllMemberCounterQuery } from '@coop/neosys-admin/data-access';

export const MemberList = () => {
  const { data, isFetching } = useGetAllMemberCounterQuery();

  const rowData = useMemo(
    () => data?.neosys?.thread?.memberCounter?.fetchMemberCounter?.records ?? [],
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
        header: 'Approved Member',
        accessorFn: (row) => row?.approvedMember,
      },
      {
        header: 'Inactive Member',
        accessorFn: (row) => row?.inactiveMember,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Members" />
      <Table data={rowData} isLoading={isFetching} columns={columns} />
    </>
  );
};

export default MemberList;
