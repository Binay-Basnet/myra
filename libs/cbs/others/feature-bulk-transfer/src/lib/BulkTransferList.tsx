import { useMemo } from 'react';

import { PageHeader, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useBulkTransfersListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

export const BulkTransferList = () => {
  const { data: bulkTransfersListData, isFetching } = useBulkTransfersListQuery({
    pagination: getPaginationQuery(),
  });

  const rowData = useMemo(
    () => bulkTransfersListData?.transaction?.listBulkTransfers?.edges ?? [],
    [bulkTransfersListData]
  );
  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'transferDate',
        header: () => 'Transfer Date',
        accessorFn: (row) => localizedDate(row?.node?.transferDate),
      },
      {
        id: 'transferType',
        header: 'Transfer Type',
        accessorFn: (row) => row?.node?.transferType,
        cell: (props) => (
          <Text textTransform="capitalize">
            {props?.row?.original?.node?.transferType?.replace(/_/g, ' ')?.toLocaleLowerCase()}
          </Text>
        ),
      },
      {
        id: 'transferSource',
        header: 'Transfer Source',
        accessorFn: (row) => row?.node?.sourceName,
      },
      {
        id: 'transferDestination',
        header: 'Transfer Destination',
        accessorFn: (row) => row?.node?.destinationName,
      },
      {
        id: 'transferAmount',
        header: 'Transfer Amount',
        accessorFn: (row) => amountConverter(row?.node?.transferAmount || 0),
        meta: {
          isNumeric: true,
          width: '15%',
        },
      },
      {
        id: 'totalTransferAmount',
        header: 'Total Transfer Amount',
        accessorFn: (row) => amountConverter(row?.node?.transferAmount || 0),
        meta: {
          isNumeric: true,
          width: '15%',
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Bulk Transfers" />

      <Table
        isLoading={isFetching}
        data={rowData}
        columns={columns}
        pagination={{
          total: bulkTransfersListData?.transaction?.listBulkTransfers?.totalCount ?? 'Many',
          pageInfo: bulkTransfersListData?.transaction?.listBulkTransfers?.pageInfo,
        }}
        rowOnClick={(row) =>
          window.open(
            `${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${row?.node?.transactionId}`,
            '_blank'
          )
        }
      />
    </>
  );
};
