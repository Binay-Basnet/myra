import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetStaffPlanningListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentStaffPlanningList = () => {
  const router = useRouter();
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
                    router.push(`${ROUTES?.HR_RECRUITMENT_STAFF_PLANNING_EDIT}?id=${row?.id}`);
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
      <PageHeader heading="Staff Planning" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.recruitment?.recruitment?.listStaffPlanning?.totalCount as number,
          pageInfo: data?.hr?.recruitment?.recruitment?.listStaffPlanning?.pageInfo,
        }}
      />
    </>
  );
};

export default HrRecruitmentStaffPlanningList;
