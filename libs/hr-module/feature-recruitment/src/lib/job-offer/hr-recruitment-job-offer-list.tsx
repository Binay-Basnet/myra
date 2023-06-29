import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { useGetJobOfferListQuery } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentJobOfferList = () => {
  const router = useRouter();
  const { data, isFetching } = useGetJobOfferListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => data?.hr?.recruitment?.recruitmentJobOffer?.listJobOffer?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Application ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Name',
        accessorFn: (row) => row?.node?.name,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
      },
      {
        header: 'Offer Date',
        accessorFn: (row) => row?.node?.offerDate?.en,
      },
      {
        header: 'Email',
        accessorFn: (row) => row?.node?.email,
      },
      {
        header: 'Designation',
        accessorFn: (row) => row?.node?.designation,
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
                    router.push(`${ROUTES?.HR_RECRUITMENT_JOB_OFFER_EDIT}?id=${row?.id}`);
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
      <PageHeader heading="Job Offering" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.hr?.recruitment?.recruitmentJobOffer?.listJobOffer?.totalCount as number,
          pageInfo: data?.hr?.recruitment?.recruitmentJobOffer?.listJobOffer?.pageInfo,
        }}
      />
    </>
  );
};

export default HrRecruitmentJobOfferList;
