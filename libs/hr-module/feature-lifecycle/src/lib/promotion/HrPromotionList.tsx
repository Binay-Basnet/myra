import { useMemo } from 'react';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetHrPromotionListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrLifecyclePromotionList = () => {
  const { data: onBoardingData, isLoading } = useGetHrPromotionListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData =
    onBoardingData?.hr?.employeelifecycle?.employeePromotion?.listEmployeePromotion?.edges ?? [];
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
        header: 'Promotion Type',
        accessorFn: (props) => props?.node?.promotionType,
        id: 'promotion Type',
      },
      {
        header: 'New Promotion',
        id: 'newPromotion',
        accessorFn: (props) => props?.node?.newPromotion,
      },
      {
        header: 'New Promotion',
        id: 'newPromotion',
        accessorFn: (props) => props?.node?.newPromotion,
      },
      {
        header: 'Resignation Letter Date',
        id: 'Date',
        accessorFn: (props) => localizedDate(props?.node?.promotionDate),
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
            onBoardingData?.hr?.employeelifecycle?.employeePromotion?.listEmployeePromotion
              ?.totalCount ?? 'Many',
          pageInfo:
            onBoardingData?.hr?.employeelifecycle?.employeePromotion?.listEmployeePromotion
              ?.PageInfo,
        }}
      />
    </>
  );
};
