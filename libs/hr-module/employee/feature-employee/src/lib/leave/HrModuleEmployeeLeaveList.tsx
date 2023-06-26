import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetLeaveListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrLeaveList = () => {
  const { data, isFetching } = useGetLeaveListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.hr?.employee?.leave?.listLeave?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Employee Id',
        accessorFn: (row) => row?.node?.employeeId,
      },
      {
        header: 'Employee Name',
        accessorFn: (row) => row?.node?.employeeName,
      },
      {
        header: 'Reason',
        accessorFn: (row) => row?.node?.reason,
      },
      {
        header: 'Leave Type',
        accessorFn: (row) => row?.node?.leaveType,
      },
      {
        header: 'From Date',
        accessorFn: (row) => row?.node?.leaveFrom?.local,
      },
      {
        header: 'To Date',
        accessorFn: (row) => row?.node?.leaveTo?.local,
      },
      {
        header: 'Approver',
        accessorFn: (row) => row?.node?.approver,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Leaves" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.employee?.leave?.listLeave?.totalCount as number,
          pageInfo: data?.hr?.employee?.leave?.listLeave?.pageInfo,
        }}
      />
    </>
  );
};

export default HrLeaveList;
