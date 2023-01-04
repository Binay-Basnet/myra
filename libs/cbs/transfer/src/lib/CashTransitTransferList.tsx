import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, PageHeader, Text } from '@myra-ui';
import { ApprovalStatusCell, Column, Table } from '@myra-ui/table';

import {
  TellerActivityEntry,
  TellerActivityState,
  TellerTransferType,
  useGetTellerTransactionListDataQuery,
} from '@coop/cbs/data-access';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

import { TellerTransferApproveModal } from '../components';

/* eslint-disable-next-line */
export interface CashTransitTransferProps {}

const tellerActivityVariant: Record<TellerActivityState, 'success' | 'failure' | 'pending'> = {
  [TellerActivityState.Approved]: 'success',
  [TellerActivityState.Pending]: 'pending',
  [TellerActivityState.Cancelled]: 'failure',
};

export const CashTransitTransferList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const modalProps = useDisclosure();

  const { data, isFetching } = useGetTellerTransactionListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      filter: {
        type: [TellerTransferType.CashInTransit],
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

        accessorFn: (row) => row?.node?.destBranch?.local,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.transferState,
        cell: (props) => (
          <ApprovalStatusCell
            status={props.row.original?.node?.transferState as string}
            variant={
              tellerActivityVariant[props.row.original?.node?.transferState as TellerActivityState]
            }
          />
        ),
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
    [t]
  );

  const selectedTransfer = rowData?.find(
    (transfer) => transfer?.node?.ID === router.query['id']
  )?.node;

  return (
    <>
      <PageHeader
        heading={`Cash in Transit Transfer - ${featureCode.vaultTransferList}`}
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
        noDataTitle="cash in transit transfer list"
        rowOnClick={(row) => {
          router.push(
            {
              query: {
                id: row?.node?.ID,
              },
            },
            undefined,
            { shallow: true }
          );
          modalProps.onToggle();
        }}
      />

      <TellerTransferApproveModal
        transfer={selectedTransfer as TellerActivityEntry}
        approveModal={modalProps}
      />
    </>
  );
};

export default CashTransitTransferList;
