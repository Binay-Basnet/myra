import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetEmployeeListQuery } from '@coop/cbs/data-access';
import { formatTableAddress, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const EmployeeList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetEmployeeListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.hr?.employee?.employee?.listEmployee?.edges ?? [], [data]);

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
        header: 'Department',
        accessorFn: (row) => row?.node?.employeeDepartment,
      },
      {
        header: 'Contact',
        accessorFn: (row) => row?.node?.employeeContact,
      },
      {
        header: 'Address',
        accessorFn: (row) => formatTableAddress(row?.node?.employeeAddress),
      },
      {
        header: 'Email',
        accessorFn: (row) => row?.node?.employeeEmail,
      },
      {
        header: 'Date of joining',
        accessorFn: (row) => row?.node?.employeeDateOfJoining?.local,
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
                    router.push(`${ROUTES?.HRMODULE_EMPLOYEES_EDIT}?id=${row?.id}`);
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
      <PageHeader heading="Employee List" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.employee?.employee?.listEmployee?.totalCount as number,
          pageInfo: data?.hr?.employee?.employee?.listEmployee?.pageInfo,
        }}
        rowOnClick={(row) =>
          router.push(`${ROUTES?.HRMODULE_EMPLOYEES_DETAIL}?id=${row?.node?.id}`)
        }
      />
    </>
  );
};

export default EmployeeList;
