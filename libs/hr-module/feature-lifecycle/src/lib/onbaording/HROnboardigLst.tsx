import { useMemo } from 'react';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetHrEmployeeOnboardingListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrLifecycleOnboardingList = () => {
  const { data: onBoardingData, isLoading } = useGetHrEmployeeOnboardingListQuery({
    pagination: getPaginationQuery(),
  });

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
