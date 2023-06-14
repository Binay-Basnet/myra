import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetJobApplicationListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentJobApplicationList = () => {
  const { data, isFetching } = useGetJobApplicationListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.hr?.recruitment?.recruitmentJobApplication?.listJobApplication?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Applicant ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Name',
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: 'Job Posting',
        accessorFn: (row) => row?.node?.jobPosting,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.applicantStatus,
      },
    ],
    []
  );
  return (
    <>
      <PageHeader heading="Job Application" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.recruitment?.recruitmentJobApplication?.listJobApplication
            ?.totalCount as number,
          pageInfo: data?.hr?.recruitment?.recruitmentJobApplication?.listJobApplication?.pageInfo,
        }}
      />
    </>
  );
};
export default HrRecruitmentJobApplicationList;
