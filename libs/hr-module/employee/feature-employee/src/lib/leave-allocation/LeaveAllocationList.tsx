import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetLeaveAllocationListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const LeaveAllocationList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetLeaveAllocationListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.hr?.employee?.leaveAllocation?.listLeaveAllocation?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Employee ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Name',
        accessorFn: (row) => row?.node?.employeeName,
      },
      {
        header: 'Leave Policy',
        accessorFn: (row) => row?.node?.leavePolicy,
      },
      {
        header: 'Effective Date',
        accessorFn: (row) => row?.node?.effectiveDate?.local,
      },
      {
        header: 'Last Updated',
        accessorFn: (row) => row?.node?.lastUpdated?.local,
      },
      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: 'Edit',
                  onClick: (row) => {
                    router.push(`${ROUTES?.HRMODULE_LEAVE_ALLOCATION_EDIT}?id=${row?.id}`);
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '3.125rem',
        },
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Leave Allocation" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.employee?.leaveAllocation?.listLeaveAllocation?.totalCount as number,
          pageInfo: data?.hr?.employee?.leaveAllocation?.listLeaveAllocation?.pageInfo,
        }}
      />
    </>
  );
};

export default LeaveAllocationList;
