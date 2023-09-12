import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { useGetHrExitListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrLifecycleExitList = () => {
  const { data: onBoardingData, isLoading } = useGetHrExitListQuery({
    pagination: getPaginationQuery(),
  });
  const router = useRouter();
  const rowData =
    onBoardingData?.hr?.employeelifecycle?.employeeExit?.listEmployeeExit?.edges ?? [];
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Employee Id',
        id: 'Employee id',
        accessorFn: (props) => props?.node?.employeeId,
      },
      {
        header: 'Interviewer Name',
        id: 'Name',
        accessorFn: (props) => props?.node?.interviewer,
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Seperation Date',
        accessorFn: (props) => localizedDate(props?.node?.separationDate),
        id: 'designation',
      },
      {
        header: 'Last Modified Date Date',
        id: 'Date',
        accessorFn: (props) => localizedDate(props?.node?.lastModifiedDate),
      },
      {
        id: '_actions',
        header: '',

        cell: (props) =>
          props?.row?.original && (
            <TablePopover
              node={props?.row?.original}
              items={[
                {
                  title: 'Edit',
                  aclKey: 'CBS_MEMBERS_MEMBER',
                  action: 'VIEW',
                  onClick: () => {
                    router.push(
                      `${ROUTES?.HR_LIFECYCLE_EMPLOYEE_EXIT_EDIT}?id=${props?.row?.original?.node?.id}`
                    );
                  },
                },
              ]}
            />
          ),
        meta: {
          width: '20px',
        },
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
            onBoardingData?.hr?.employeelifecycle?.employeeExit?.listEmployeeExit?.totalCount ??
            'Many',
          pageInfo: onBoardingData?.hr?.employeelifecycle?.employeeExit?.listEmployeeExit?.pageInfo,
        }}
        rowOnClick={(row) =>
          router?.push(
            `${ROUTES?.HRMODULE_EMPLOYEES_DETAIL}?id=${row?.node?.employeeId}&tab=lifecycle&subTab=exit`
          )
        }
      />
    </>
  );
};
