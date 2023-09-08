import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { EmployeeTransferType, useGetHrTransferListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrLifecycleTransferList = () => {
  const router = useRouter();
  const { data: onBoardingData, isLoading } = useGetHrTransferListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData =
    onBoardingData?.hr?.employeelifecycle?.employeeTransfer?.listEmployeeTransfer?.edges ?? [];
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
        accessorFn: (props) => props?.node?.name,
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Transfer Type',
        accessorFn: (props) =>
          props?.node?.transferType === EmployeeTransferType?.Department
            ? 'Department'
            : 'Service Center',
        id: 'TransferType',
      },
      {
        header: 'Transfer Date',
        id: 'Date',
        accessorFn: (props) => localizedDate(props?.node?.transferDate),
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Employee Transfer" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total:
            onBoardingData?.hr?.employeelifecycle?.employeeTransfer?.listEmployeeTransfer
              ?.totalCount ?? 'Many',
          pageInfo:
            onBoardingData?.hr?.employeelifecycle?.employeeTransfer?.listEmployeeTransfer?.pageInfo,
        }}
        rowOnClick={(row) =>
          router?.push(
            `${ROUTES?.HRMODULE_EMPLOYEES_DETAIL}?id=${row?.node?.employeeId}&tab=lifecycle&subTab=transfer`
          )
        }
      />
    </>
  );
};
