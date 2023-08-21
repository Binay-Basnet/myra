import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table } from '@myra-ui';

import { Arrange, useGetEmployeeAtendanceListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const AttendanceList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetEmployeeAtendanceListQuery({
    pagination: {
      ...getPaginationQuery(),
      order: {
        arrange: Arrange.Desc,
        column: 'DAY',
      },
    },
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
          pageInfo: data?.hr?.employee?.hrEmployeeAttendanceQuery?.listDetailsByDay?.pageInfo,
        }}
        rowOnClick={(row) =>
          router?.push(
            `${ROUTES?.HRMODULE_ATTENDENCE_DETAILS}?local=${row?.node?.day?.local}&&en=${row?.node?.day?.en}&&np=${row?.node?.day?.np}&&present=${row?.node?.present}&&absent=${row?.node?.absent}`
          )
        }
      />
    </>
  );
};

export default AttendanceList;
