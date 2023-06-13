import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetEmployeeListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const EmployeeList = () => {
  const { data, isFetching } = useGetEmployeeListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.hr?.employee?.employee?.listEmployee?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Employee ID',
        accessorFn: (row) => row?.node?.employeeId,
      },
      {
        header: 'Name',
        accessorFn: (row) => row?.node?.employeeName,
      },
      {
        header: 'Department',
        accessorFn: (row) => row?.node?.employeeDepartment,
      },
      {
        header: 'Contact',
        accessorFn: (row) => row?.node?.employeeContact,
      },
      {
        header: 'Address',
        accessorFn: (row) => row?.node?.employeeAddress,
      },
      {
        header: 'Email',
        accessorFn: (row) => row?.node?.employeeEmail,
      },
      {
        header: 'Date of joining',
        accessorFn: (row) => row?.node?.employeeDateOfJoining,
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Employee List" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.employee?.employee?.listEmployee?.totalCount as number,
          pageInfo: data?.hr?.employee?.employee?.listEmployee?.pageInfo,
        }}
      />
    </>
  );
};

export default EmployeeList;
