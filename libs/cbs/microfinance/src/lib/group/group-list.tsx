import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table } from '@myra-ui';

import { useListGroupQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const GroupList = () => {
  const router = useRouter();
  const { data, isFetching } = useListGroupQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.microFinance?.group?.listGroup?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Group Id',
        accessorFn: (row) => row?.node?.groupId,
      },
      {
        header: 'Group Name',
        accessorFn: (row) => row?.node?.groupName,
      },
      {
        header: 'Group Coordinator Name',
        accessorFn: (row) => row?.node?.groupCoordinator?.name?.local,
      },
      {
        header: 'Total Members',
        accessorFn: (row) => row?.node?.totalMembers,
      },
      {
        header: 'Created Date',
        accessorFn: (row) => row?.node?.createdDate?.local,
      },
      {
        id: '_actions',
        header: '',
        cell: () => {},
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Microfinance Groups List" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.microFinance?.group?.listGroup?.totalCount as number,
          pageInfo: data?.microFinance?.group?.listGroup?.pageInfo,
        }}
        rowOnClick={(row) =>
          router.push(`${ROUTES?.CBS_MICRO_FINANCE_GROUP_DETAILS}?id=${row?.node?.id}`)
        }
      />
    </>
  );
};

export default GroupList;
