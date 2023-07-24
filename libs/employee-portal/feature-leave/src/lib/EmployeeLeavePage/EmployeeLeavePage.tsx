import { Box, Divider, Table, Text } from '@myra-ui';

import {
  DateRangeSelector,
  EmployeeHeader,
  EmployeeStatCard,
} from '@coop/employee-portal/components';

type LeaveTable = {
  leaveType: string;
  leaveCount: number;
  duration: {
    from: string;
    to: string;
  };
  reason: string;
  approver: string;
  status: string;
};

export const EmployeeLeavePage = () => (
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
        <EmployeeStatCard title="Casual Leave" subTitle="0/12" />
        <EmployeeStatCard title="Sick Leave" subTitle="0/12" />
        <EmployeeStatCard title="Off-in-Lieu Leave" subTitle="0/12" />
        <EmployeeStatCard title="Unpaid Leave" subTitle="0/12" />
      </Box>
    </Box>

    <Divider my="s8" />

    <Box py="s24" display="flex" flexDir="column" gap="s12">
      <DateRangeSelector />
      <Box border="1px" h="560px" borderColor="border.layout" borderRadius="br2" overflow="hidden">
        <Table<LeaveTable>
          isStatic
          data={[]}
          columns={[
            {
              header: 'Leave Type',
              accessorKey: 'leaveType',
            },
            {
              header: 'Leave Count',
              accessorKey: 'leaveCount',
              cell: (props) => `${props.row.original.leaveCount} day(s)`,
            },
            {
              header: 'Duration',
              accessorKey: 'duration',
              cell: (props) =>
                `${props.row.original.duration.from} - ${props.row.original.duration.to}`,
            },
            {
              header: 'Reason',
              accessorKey: 'reason',
            },
            {
              header: 'Leave Approver',
              accessorKey: 'approver',
            },
            {
              header: 'Status',
              accessorKey: 'status',
            },
          ]}
        />
      </Box>
    </Box>
  </>
);
