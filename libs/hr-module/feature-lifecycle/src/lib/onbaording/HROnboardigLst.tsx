import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { PageHeader } from '@myra-ui';
import { Column, Table, TablePopover } from '@myra-ui/table';

import { useGetHrEmployeeOnboardingListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrLifecycleOnboardingList = () => {
  const { data: onBoardingData, isLoading } = useGetHrEmployeeOnboardingListQuery({
    pagination: getPaginationQuery(),
  });
  const router = useRouter();
  const rowData =
    onBoardingData?.hr?.employeelifecycle?.employeeOnboarding?.listEmployeeOnboarding?.edges ?? [];
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Name',
        accessorKey: 'node.name',
        meta: {
          width: '80%',
        },
      },
      {
        header: 'Activity',
        accessorKey: 'node.activity',
      },
      {
        header: 'Email',
        accessorKey: 'node.email',
      },
      {
        header: 'Onboarding Status ',
        accessorKey: 'node.onboarding_status',
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
                      `${ROUTES?.HR_LIFECYCLE_EMPLOYEE_ONBOAORDING_EDIT}?id=${props?.row?.original?.node?.id}`
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
      <PageHeader heading="Employee Onboarding" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total:
            onBoardingData?.hr?.employeelifecycle?.employeeOnboarding?.listEmployeeOnboarding
              ?.totalCount ?? 'Many',
          pageInfo:
            onBoardingData?.hr?.employeelifecycle?.employeeOnboarding?.listEmployeeOnboarding
              ?.pageInfo,
        }}
      />
    </>
  );
};
