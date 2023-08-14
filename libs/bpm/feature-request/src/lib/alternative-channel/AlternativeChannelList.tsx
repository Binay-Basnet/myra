import { useMemo } from 'react';
import { ApprovalStatusItem } from 'libs/cbs/requests/feature-lists/src/components/ApprovalStatusItem';

import { Column, PageHeader, Table } from '@myra-ui';

import { AlternativeChannelStatus, useGetAlternativeChannelListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

const categoryEnum = {
  SMS_BANKING: 'Sms Banking',
  EBANKING: 'eBanking',
  MOBILE_BANKING: 'Mobile Banking',
};

export const AlternativeChannelList = () => {
  const { data, isFetching } = useGetAlternativeChannelListQuery({
    paginate: getPaginationQuery(),
  });

  const rowData = useMemo(() => data?.alternativeChannel?.list?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Name',
        accessorFn: (row) => row?.data?.name?.local,
      },
      {
        header: 'Alternative Channel Category',
        accessorFn: (row) => categoryEnum?.[row?.data?.serviceType],
      },
      {
        header: 'Phone Number',
        accessorFn: (row) => row?.data?.phoneNumber,
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.data?.serviceStatus,
        cell: (props) => (
          <ApprovalStatusItem
            status={props?.row?.original?.data?.serviceStatus as AlternativeChannelStatus}
          />
        ),
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Alternative Channel" />{' '}
      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: data?.alternativeChannel?.list?.totalCount as number,
          pageInfo: data?.alternativeChannel?.list?.pageInfo,
        }}
      />
    </>
  );
};

export default AlternativeChannelList;
