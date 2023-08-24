import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { format, parseISO } from 'date-fns';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import { Box, Column, Divider, PageHeader, Table, Text } from '@myra-ui';

import { AttendanceStatus, useGetListDetailsOfDayQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const AttendanceDetails = () => {
  const router = useRouter();

  const parsedDate = parseISO(router?.query?.['en'] as string);
  const formattedDate = format(parsedDate, 'EEEE, MMMM dd');

  const { data, isFetching } = useGetListDetailsOfDayQuery({
    filter: {
      orConditions: [
        {
          andConditions: [
            { column: 'attendancedate', comparator: 'EqualTo', value: router?.query?.['en'] },
          ],
        },
        { andConditions: [{ column: 'attendancedate', comparator: 'HasNoValue', value: 'NULL' }] },
      ],
    },
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.hr?.employee?.hrEmployeeAttendanceQuery?.listDetailsOfDay?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Employee',
        accessorFn: (row) => row?.node?.employee,
      },
      {
        id: 'state',
        header: 'Status',
        accessorFn: (row) => row?.node?.status,

        cell: (props) => (
          <ApprovalStatusItem status={props?.row?.original?.node?.status as AttendanceStatus} />
        ),
      },
      {
        header: 'Attendance Date',
        accessorFn: (row) => row?.node?.attendanceDate?.local,
      },
      {
        header: 'Department',
        accessorFn: (row) => row?.node?.department,
      },
      {
        header: 'Designation',
        accessorFn: (row) => row?.node?.designation,
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading={`Attendance > ${formattedDate}`} />
      <Box display="flex" flexDir="column" p="s16" gap="s8">
        <Text fontSize="r1" fontWeight="medium">
          Attendance Overview
        </Text>
        <Box display="flex" gap="s24">
          <Box
            display="flex"
            flexDirection="column"
            padding="s16"
            border="1px"
            borderColor="border.layout"
            borderRadius={5}
          >
            <Text fontSize="s3">Total Present</Text>
            <Text fontSize="r2" fontWeight="semibold">
              {router?.query?.['present']}
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            padding="s16"
            border="1px"
            borderColor="border.layout"
            borderRadius={5}
          >
            <Text fontSize="s3">Total Absent</Text>
            <Text fontSize="r2" fontWeight="semibold">
              {router?.query?.['absent']}
            </Text>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.employee?.hrEmployeeAttendanceQuery?.listDetailsOfDay
            ?.totalCount as number,
          pageInfo: data?.hr?.employee?.hrEmployeeAttendanceQuery?.listDetailsOfDay?.pageInfo,
        }}
      />
    </>
  );
};

export default AttendanceDetails;
