import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { PageHeader } from '@myra-ui';
import { ApprovalStatusCell, Column, Table } from '@myra-ui/table';

import {
  CashInTransitInfo,
  CashInTransitTransferType,
  RequestStatus,
  useGetCashInTransitListQuery,
} from '@coop/cbs/data-access';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

import { CashInTransitTransferAproveModal } from '../components/cash-in-transit/CashInTransitTransferAproveModal';

/* eslint-disable-next-line */
export interface CashTransitTransferProps {}

const tellerActivityVariant: Record<RequestStatus, 'success' | 'failure' | 'pending'> = {
  [RequestStatus.Approved]: 'success',
  [RequestStatus.Pending]: 'pending',
  [RequestStatus.Declined]: 'failure',
};

const CASH_IN_TRANSIT_TAB_ITEMS = [
  {
    title: 'Sent',
    key: CashInTransitTransferType.Sent,
  },
  {
    title: 'Received',
    key: CashInTransitTransferType.Received,
  },
];

export const CashTransitTransferList = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const modalProps = useDisclosure();

  const { data, isFetching } = useGetCashInTransitListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      transferType: (router.query['objState'] ??
        CashInTransitTransferType.Sent) as CashInTransitTransferType,
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.cashInTransit?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.id,
      },
      {
        header: 'Sender Service Center',
        accessorFn: (row) => row?.node?.senderServiceCentreName,
      },
      {
        header: 'Receiver Service Center',
        accessorFn: (row) => row?.node?.receiverServiceCentreName,
      },
      {
        header: 'Approval Status',
        accessorFn: (row) => row?.node?.approvalStatus,
        cell: (props) => (
          <ApprovalStatusCell
            status={props.row.original?.node?.approvalStatus as string}
            variant={
              tellerActivityVariant[props.row.original?.node?.approvalStatus as RequestStatus]
            }
          />
        ),
      },
      {
        header: 'Cash Amount',

        accessorFn: (row) => row?.node?.cashAmount,
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Transfer Date',
        accessorFn: (row) => row?.node?.transferDate?.local?.split(' ')[0] ?? 'N/A',
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
    (transfer) => transfer?.node?.id === router.query['id']
  )?.node;

  return (
    <>
      <PageHeader
        heading={`Cash in Transit Transfer - ${featureCode.vaultTransferList}`}
        tabItems={CASH_IN_TRANSIT_TAB_ITEMS}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.cashInTransit?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.cashInTransit?.pageInfo,
        }}
        noDataTitle="cash in transit transfer list"
        rowOnClick={(row) => {
          router.push(
            {
              query: {
                ...router.query,
                id: row?.node?.id,
              },
            },
            undefined,
            { shallow: true }
          );
          modalProps.onToggle();
        }}
      />

      <CashInTransitTransferAproveModal
        transfer={selectedTransfer as CashInTransitInfo}
        approveModal={modalProps}
      />
    </>
  );
};

export default CashTransitTransferList;
