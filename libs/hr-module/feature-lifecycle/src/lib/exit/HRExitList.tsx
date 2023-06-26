import { useMemo } from 'react';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetHrSeperationListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrLifecycleExitList = () => {
  const { data: onBoardingData, isLoading } = useGetHrSeperationListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData =
    onBoardingData?.hr?.employeelifecycle?.employeeSeparation?.listEmployeeSeparation?.edges ?? [];
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Employee Id',
        id: 'Employee id',
        accessorFn: (props) => props?.node?.employeeId,
      },
      {
        header: 'Name',
        id: 'Name',
        accessorFn: (props) => props?.node?.employeeName,
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Designation',
        accessorFn: (props) => props?.node?.designation,
        id: 'designation',
      },
      {
        header: 'Resignation Letter Date',
        id: 'Date',
        accessorFn: (props) => localizedDate(props?.node?.resignationLetterDate),
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Employee Seperation" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total:
            onBoardingData?.hr?.employeelifecycle?.employeeSeparation?.listEmployeeSeparation
              ?.totalCount ?? 'Many',
          pageInfo:
            onBoardingData?.hr?.employeelifecycle?.employeeSeparation?.listEmployeeSeparation
              ?.PageInfo,
        }}
      />
    </>
  );
};
