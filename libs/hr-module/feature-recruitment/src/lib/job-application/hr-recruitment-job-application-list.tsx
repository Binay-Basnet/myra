import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetJobApplicationListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentJobApplicationList = () => {
  const router = useRouter();
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
                    router.push(`${ROUTES?.HR_RECRUITMENT_JOB_APPLICATION_EDIT}?id=${row?.id}`);
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
        rowOnClick={(item) =>
          router.push(`${ROUTES?.HR_RECRUITMENT_JOB_APPLICATION_DETAIL}?id=${item?.node?.id}`)
        }
      />
    </>
  );
};
export default HrRecruitmentJobApplicationList;
