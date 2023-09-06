import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetJobOpeningListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentJobOpeningList = () => {
  const router = useRouter();
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
        accessorFn: (row) => row?.node?.id,
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
                    router.push(`${ROUTES?.HR_RECRUITMENT_JOB_OPENING_EDIT}?id=${row?.id}`);
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
      <PageHeader heading="Job Opening" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.recruitment?.recruitmentJobOpening?.listJobOpening?.totalCount as number,
          pageInfo: data?.hr?.recruitment?.recruitmentJobOpening?.listJobOpening?.pageInfo,
        }}
        rowOnClick={(item) =>
          router.push(`${ROUTES?.HR_RECRUITMENT_JOB_OPENING_DETAIL}?id=${item?.node?.id}`)
        }
      />
    </>
  );
};

export default HrRecruitmentJobOpeningList;
