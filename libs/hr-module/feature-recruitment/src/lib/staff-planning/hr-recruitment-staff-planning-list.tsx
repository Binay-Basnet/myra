import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetStaffPlanningListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentStaffPlanningList = () => {
  const { data, isFetching } = useGetStaffPlanningListQuery({
    pagination: getPaginationQuery(),
  });
  const rowData = useMemo(
    () => data?.hr?.recruitment?.recruitment?.listStaffPlanning?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Staff Plan',
        accessorFn: (row) => row?.node?.staffPlanTitle,
      },
      {
        header: 'Vacancies',
        accessorFn: (row) => row?.node?.vacancies,
      },
      {
        header: 'Open Position',
        accessorFn: (row) => row?.node?.open_position,
      },
      {
        header: 'Date From',
        accessorFn: (row) => row?.node?.date?.from?.local,
      },
      {
        header: 'Date To',
        accessorFn: (row) => row?.node?.date?.to?.local,
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Staff Planning" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.recruitment?.recruitment?.listStaffPlanning?.totalCount as number,
          pageInfo: data?.hr?.recruitment?.recruitment?.listStaffPlanning?.pageInfo,
        }}
        menu="SHARE"
      />
    </>
  );
};

export default HrRecruitmentStaffPlanningList;
