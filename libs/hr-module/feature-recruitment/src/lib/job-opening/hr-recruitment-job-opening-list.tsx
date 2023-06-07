import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetJobOpeningListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentJobOpeningList = () => {
  const { data, isFetching } = useGetJobOpeningListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.hr?.recruitment?.recruitmentJobOpening?.listJobOpening?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Job ID',
        accessorFn: (row) => row?.node?.jobId,
      },
      {
        header: 'Title',
        accessorFn: (row) => row?.node?.title,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
      },
      {
        header: 'Staff Plan',
        accessorFn: (row) => row?.node?.staffPlan,
      },
      {
        header: 'Designation',
        accessorFn: (row) => row?.node?.designation,
      },
      {
        header: 'Department',
        accessorFn: (row) => row?.node?.department,
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Job Opening" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.recruitment?.recruitmentJobOpening?.listJobOpening?.totalCount as number,
          pageInfo: data?.hr?.recruitment?.recruitmentJobOpening?.listJobOpening?.pageInfo,
        }}
      />
    </>
  );
};

export default HrRecruitmentJobOpeningList;
