import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetMemberCounterQuery } from '@coop/neosys-admin/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const MemberList = () => {
  const { data, isFetching } = useGetMemberCounterQuery({
    pagination: { ...getPaginationQuery(), order: null },
  });

  const rowData = useMemo(
    () => data?.neosys?.thread?.memberCounter?.listMemberCounter?.edges ?? [],
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
        header: 'Approved Member',
        accessorFn: (row) => row?.node?.approvedMember,
      },
      {
        header: 'Inactive Member',
        accessorFn: (row) => row?.node?.inactiveMember,
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
        header: 'Created at',
        accessorFn: (row) => row?.node?.createdAt,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Members" />
      <Table
        data={rowData}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.neosys?.thread?.memberCounter?.listMemberCounter?.totalCount as number,
          pageInfo: data?.neosys?.thread?.memberCounter?.listMemberCounter?.pageInfo,
        }}
      />
    </>
  );
};

export default MemberList;
