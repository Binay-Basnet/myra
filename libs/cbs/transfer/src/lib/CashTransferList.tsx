import { useMemo } from 'react';

import { Box, PageHeader, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { TellerTransferType, useGetTellerTransactionListDataQuery } from '@coop/cbs/data-access';
import { PopoverComponent } from '@coop/myra/components';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CashTransferListProps {}

export const CashTransferList = () => {
  const { t } = useTranslation();

  const { data, isFetching } = useGetTellerTransactionListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        type: [TellerTransferType.VaultToCash, TellerTransferType.CashToVault],
      },
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.listTellerTransaction?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.transferCode,
      },
      {
        accessorFn: (row) =>
          row?.node?.transferType === TellerTransferType.VaultToCash
            ? row?.node?.destTeller?.local
            : row?.node?.srcTeller?.local,
        header: 'Sender Service Center',
        cell: (props) => (
          <Box display="flex" alignItems="center" gap="s12">
            <Text
              fontSize="s3"
              textTransform="capitalize"
              textOverflow="ellipsis"
              overflow="hidden"
            >
              {props.getValue() as string}
            </Text>
          </Box>
        ),
      },
      {
        header: 'Receiver Service Center',

        accessorFn: (row) => row?.node?.amount,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.date?.split(' ')[0] ?? 'N/A',
      },
      {
        header: 'Cash Amount',

        accessorFn: (row) => row?.node?.amount,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Transfer Date',
        accessorFn: (row) => row?.node?.date?.split(' ')[0] ?? 'N/A',
      },
      {
        id: '_actions',
        header: '',
        accessorKey: 'actions',
        cell: (cell) => {
          const member = cell?.row?.original?.node;
          const memberData = { id: member?.ID };
          return <PopoverComponent items={[]} member={memberData} />;
        },
        meta: {
          width: '60px',
        },
      },
    ],
    [t]
  );

  return (
    <>
      <PageHeader
        heading={`Service Center Cash Transfer - ${featureCode.vaultTransferList}`}
        // tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listTellerTransaction?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listTellerTransaction?.pageInfo,
        }}
        noDataTitle="service center cash transfer list"
      />
    </>
  );
};

export default CashTransferList;
