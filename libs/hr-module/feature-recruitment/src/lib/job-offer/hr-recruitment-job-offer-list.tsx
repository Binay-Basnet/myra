import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetJobOfferListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const HrRecruitmentJobOfferList = () => {
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
