import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetSalaryStructureAssignmentListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const SalaryStructureAssignmentList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetSalaryStructureAssignmentListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.hr?.payroll?.salaryStructureAssignment?.listSalaryStructureAssignment?.edges ?? [],
    [data]
  );

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
        accessorFn: (row) => row?.node?.department,
      },
      {
        header: 'Contact',
        accessorFn: (row) => row?.node?.contact,
      },
      {
        header: 'Salary Strcuture',
        accessorFn: (row) => row?.node?.salaryStructure,
      },
      {
        header: 'Email',
        accessorFn: (row) => row?.node?.email,
      },
      {
        header: 'Base Salary',
        accessorFn: (row) => row?.node?.baseSalary,
      },
      {
        header: 'Last Updated',
        accessorFn: (row) => row?.node?.lastUpdated?.local,
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
                    router.push(
                      `${ROUTES?.HR_PAYROLL_SALARY_STRUCTURE_ASSIGNMENT_EDIT}?id=${row?.id}`
                    );
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
      <PageHeader heading="Salary Structure Assignment" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.payroll?.salaryStructureAssignment?.listSalaryStructureAssignment
            ?.totalCount as number,
          pageInfo:
            data?.hr?.payroll?.salaryStructureAssignment?.listSalaryStructureAssignment?.pageInfo,
        }}
      />
    </>
  );
};
export default SalaryStructureAssignmentList;
