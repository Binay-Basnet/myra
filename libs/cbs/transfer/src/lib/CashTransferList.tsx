import { useMemo } from 'react';

import { Column, PageHeader, Table } from '@myra-ui';

import { useGetServiceCenterTransferListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter, featureCode, getRouterQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CashTransferListProps {}

export const CashTransferList = () => {
  const { data, isFetching } = useGetServiceCenterTransferListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(
    () => data?.transaction?.listServiceCenterCashTransfer?.edges ?? [],
    [data]
  );

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Sender Service Center',
        accessorFn: (row) => row?.node?.sender,
      },
      {
        header: 'Receiver Service Center',

        accessorFn: (row) => row?.node?.receiver,
        meta: {
          isNumeric: true,
          width: '20%',
        },
      },
      {
        header: 'Cash Amount',

        accessorFn: (row) => amountConverter(row?.node?.amount as string),
        meta: {
          isNumeric: true,
          width: '20%',
        },
      },
      {
        header: 'Transfer Date',
        accessorFn: (row) => localizedDate(row?.node?.transactionDate),
      },
      // {
      //   id: '_actions',
      //   header: '',
      //   accessorKey: 'actions',
      //   cell: (cell) => {
      //     const member = cell?.row?.original?.node;
      //     const memberData = { id: member?.ID };
      //     return <PopoverComponent items={[]} member={memberData} />;
      //   },
      //   meta: {
      //     width: '60px',
      //   },
      // },
    ],
    []
  );
  return (
    // const { t } = useTranslation();

    <>
      <PageHeader
        heading={`Inter Service Center Transaction - ${featureCode.serviceCenterTransferList}`}
        // tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listServiceCenterCashTransfer?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listServiceCenterCashTransfer?.pageInfo,
        }}
        noDataTitle="service center cash transfer list"
        menu="TRANSFERS"
      />
    </>
  );
};

export default CashTransferList;
