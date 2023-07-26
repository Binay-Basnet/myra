import dayjs from 'dayjs';

import { Box, Divider, Table, TablePopover, Text } from '@myra-ui';

import {
  DateRangeSelectorWithFilter,
  EmployeeHeader,
  EmployeeStatCard,
} from '@coop/employee-portal/components';

type AttendanceTable = {
  date: string;
  checkIn: string;
  checkOut: string;
  overtime: string;
  status: string;
};

export const EmployeeAttendancePage = () => (
  <>
    <EmployeeHeader
      title="Attendance"
      subTitle="Find all your attendance history, overtimes, checkin/out details and more. "
    />

    <Box display="flex" flexDir="column" gap="s8" py="s24">
      <Text fontSize="r1" color="gray.600" fontWeight={500}>
        Attendance Overview
      </Text>
      <Box display="flex" gap="s20">
        <EmployeeStatCard title="Total Present" subTitle="34" />
        <EmployeeStatCard title="Total Absent" subTitle="12" />
        <EmployeeStatCard title="Total Overtime" subTitle="35hr 40m" />
      </Box>
    </Box>

    <Divider my="s8" />

    <Box py="s24" display="flex" flexDir="column" gap="s12">
      <DateRangeSelectorWithFilter />
      <Box
        border="1px"
        maxH="560px"
        borderColor="border.layout"
        borderRadius="br2"
        overflow="hidden"
      >
        <Table<AttendanceTable>
          isStatic
          data={[]}
          columns={[
            {
              header: 'Date',
              accessorKey: 'date',
              cell: (props) => dayjs(props.getValue() as string).format('dddd, YYYY-MM-DD'),
            },
            {
              header: 'Check in',
              accessorKey: 'checkIn',
              cell: (props) => dayjs(props.getValue() as string).format('hh:mm A'),
              meta: {
                width: '20%',
              },
            },
            {
              header: 'Check out',
              accessorKey: 'checkOut',
              cell: (props) => dayjs(props.getValue() as string).format('hh:mm A'),
              meta: {
                width: '20%',
              },
            },
            {
              header: 'Overtime',
              accessorKey: 'overtime',
              cell: (props) => dayjs(props.getValue() as string).format('hh:mm A'),
              meta: {
                width: '20%',
              },
            },
            {
              header: 'Status',
              accessorKey: 'status',
              meta: {
                width: '20%',
              },
            },
            {
              header: '',
              accessorKey: 'actions',
              cell: (props) => <TablePopover items={[]} node={props.row.original} />,
            },
          ]}
        />
      </Box>
    </Box>
  </>
);
