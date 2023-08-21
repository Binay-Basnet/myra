import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { LeaveStatusEnum, useGetLeaveListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

import LeaveApproveModal from './components/LeaveApproveModal';

export const HrLeaveList = () => {
  const router = useRouter();
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [selectedLeaveId, setSelectedLeaveId] = useState('');

  const handleClearLeaveId = () => {
    setSelectedLeaveId('');
  };

  const handleCloseApproveModal = () => {
    setIsApproveModalOpen(false);
  };

  const { data, isFetching, refetch } = useGetLeaveListQuery({
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
        id: 'state',
        header: 'Status',
        accessorFn: (row) => row?.node?.status,

        cell: (props) => (
          <ApprovalStatusItem status={props?.row?.original?.node?.status as LeaveStatusEnum} />
        ),
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
                    router.push(`${ROUTES?.HRMODULE_LEAVE_EDIT}?id=${row?.id}`);
                  },
                },
                {
                  title: 'Approve Leave',
                  onClick: (row) => {
                    setSelectedLeaveId(row?.id);
                    setIsApproveModalOpen(true);
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
      <LeaveApproveModal
        isApproveModalOpen={isApproveModalOpen}
        selectedLeaveId={selectedLeaveId}
        handleClearLeaveId={handleClearLeaveId}
        handleCloseApproveModal={handleCloseApproveModal}
        refetch={refetch}
      />
    </>
  );
};

export default HrLeaveList;
