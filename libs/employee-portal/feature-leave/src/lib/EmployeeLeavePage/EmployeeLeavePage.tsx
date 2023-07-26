import React from 'react';
import dayjs from 'dayjs';

import { ApprovalStatusCell, Box, Divider, Table, Text } from '@myra-ui';

import {
  DateRangeSelectorWithFilter,
  EmployeeHeader,
  EmployeeStatCard,
  getRange,
} from '@coop/employee-portal/components';
import {
  LeaveStatusEnum,
  useAppSelector,
  useGetLeaveListQuery,
  useGetLeaveStatsQuery,
} from '@coop/employee-portal/data-access';
import { getFilterQuery } from '@coop/shared/utils';

const leaveVariant: Record<LeaveStatusEnum, 'success' | 'failure' | 'pending'> = {
  [LeaveStatusEnum.Approved]: 'success',
  [LeaveStatusEnum.Pending]: 'pending',
  [LeaveStatusEnum.Declined]: 'failure',
};

export const EmployeeLeavePage = () => {
  const userId = useAppSelector((state) => state.auth.user?.id);
  const { data } = useGetLeaveStatsQuery();
  const { data: leaveListData } = useGetLeaveListQuery({
    filter: getFilterQuery({
      id: { compare: '=', value: String(userId) },
      leaveFrom: {
        compare: '< >',
        value: {
          from: getRange('week', new Date()).from.format('YYYY-MM-DD'),
          to: getRange('week', new Date()).to.format('YYYY-MM-DD'),
        },
      },
    }),
    pagination: { after: '', first: -1 },
  });

  return (
    <>
      <EmployeeHeader
        title="Leave"
        subTitle="Find all your Leave Balance, Leave History and Request Status."
      />

      <Box display="flex" flexDir="column" gap="s8" py="s24">
        <Text fontSize="r1" color="gray.600" fontWeight={500}>
          Leave Balance
        </Text>
        <Box display="flex" gap="s20">
          {data?.employee?.leave?.statistics?.data?.map((stats) => (
            <React.Fragment key={stats.leaveType}>
              <EmployeeStatCard
                title={String(stats.leaveType)}
                subTitle={`${stats.takenLeave}/${stats.totalLeave}`}
              />
            </React.Fragment>
          ))}
        </Box>
      </Box>

      <Divider my="s8" />

      <Box py="s24" display="flex" flexDir="column" gap="s12">
        <DateRangeSelectorWithFilter />
        <Box
          border="1px"
          h={
            Number(leaveListData?.employee?.leave?.list?.data?.edges?.length) < 8 ? '100%' : '560px'
          }
          borderColor="border.layout"
          borderRadius="br2"
          overflow="hidden"
        >
          <Table
            isStatic
            data={leaveListData?.employee?.leave?.list?.data?.edges || []}
            columns={[
              {
                header: 'Leave Type',
                accessorFn: (row) => row?.node?.leaveType,
              },
              {
                header: 'Leave Count',
                cell: (props) =>
                  `${dayjs(props.row.original?.node?.leaveTo?.local).diff(
                    dayjs(props.row.original?.node?.leaveFrom?.local),
                    'day'
                  )} day(s)`,
              },
              {
                header: 'Duration',
                accessorFn: (row) => row?.node?.leaveType,
                cell: (props) =>
                  `${props.row.original?.node?.leaveFrom?.local} - ${props.row.original?.node?.leaveTo?.local}`,
              },
              {
                header: 'Reason',
                accessorFn: (row) => row?.node?.leaveReason,
              },
              {
                header: 'Leave Approver',
                accessorFn: (row) => row?.node?.leaveApprover,
              },
              {
                header: 'Status',
                accessorFn: (row) => row?.node?.leaveStatus,
                cell: (props) => (
                  <ApprovalStatusCell
                    status={props?.row?.original?.node?.leaveStatus as string}
                    variant={leaveVariant[props.row.original?.node?.leaveStatus as LeaveStatusEnum]}
                  />
                ),
              },
            ]}
          />
        </Box>
      </Box>
    </>
  );
};
