import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetEmployeeAtendanceListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const AttendanceList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetEmployeeAtendanceListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.hr?.employee?.hrEmployeeAttendanceQuery?.listDetailsByDay?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Attendance Date',
        accessorFn: (row) => row?.node?.day?.local,
      },
      {
        header: 'Total Employee',
        accessorFn: (row) => row?.node?.totalEmployee,
      },
      {
        header: 'Present',
        accessorFn: (row) => row?.node?.present,
      },
      {
        header: 'Absent',
        accessorFn: (row) => row?.node?.absent,
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Attendance" />
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.employee?.hrEmployeeAttendanceQuery?.listDetailsByDay
            ?.totalCount as number,
          pageInfo: data?.hr?.employee?.hrEmployeeAttendanceQuery?.listDetailsByDay?.pageinfo,
        }}
      />
    </>
  );
};

export default AttendanceList;
