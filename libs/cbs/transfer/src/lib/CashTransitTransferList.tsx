import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, PageHeader, Text } from '@myra-ui';
import { ApprovalStatusCell, Column, Table, TablePopover } from '@myra-ui/table';

import {
  CashInTransitInfo,
  CashInTransitTransferType,
  RequestStatus,
  useAppSelector,
  useGetCashInTransitListQuery,
  useGetMemberFilterMappingQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

import { CashInTransitTransferAproveModal } from '../components/cash-in-transit/CashInTransitTransferAproveModal';

/* eslint-disable-next-line */
export interface CashTransitTransferProps {}

const tellerActivityVariant: Record<RequestStatus, 'success' | 'failure' | 'pending'> = {
  [RequestStatus.Approved]: 'success',
  [RequestStatus.Pending]: 'pending',
  [RequestStatus.Declined]: 'failure',
  [RequestStatus.Printed]: 'success',
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
  const { data: filterMapping } = useGetMemberFilterMappingQuery();
  const branchId = useAppSelector((state) => state.auth.user?.currentBranch?.id);
  const { t } = useTranslation();
  const modalProps = useDisclosure();

  const { data, isFetching } = useGetCashInTransitListQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(
      router.query['objState'] === CashInTransitTransferType?.Received
        ? { receiverBranch: { value: String(branchId), compare: '=' } }
        : { senderBranch: { value: String(branchId), compare: '=' } }
    ),
  });

  const rowData = useMemo(() => data?.transaction?.cashInTransit?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'transferDate',
        header: 'Transfer Date',
        accessorFn: (row) => localizedDate(row?.node?.transferDate),
        cell: (props) => localizedDate(props?.row?.original?.node?.transferDate),
        enableColumnFilter: true,
        enableSorting: true,
        filterFn: 'dateTime',
        meta: {
          orderId: 'id',
        },
      },
      {
        header: 'Transfer ID',
        accessorFn: (row) => row?.node?.transactionCode,
      },
      {
        id: 'senderBranch',
        header: 'Sender',
        accessorFn: (row) => row?.node?.senderServiceCentreName,
        cell: (props) => (
          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontWeight="Regular" fontSize="r1" lineHeight="17px" color="gray.900">
              {props.row.original?.node?.senderTellerName}
            </Text>
            <Text fontWeight="Regular" fontSize="s3" lineHeight="16px" color="gray.500">
              {props.row.original?.node?.senderServiceCentreName}
            </Text>
          </Box>
        ),
        enableColumnFilter: true,

        meta: {
          width: '20%',
          filterMaps: { list: filterMapping?.members?.filterMapping?.serviceCenter || [] },
        },
      },
      {
        id: 'receiverBranch',
        header: 'Receiver Service Center',
        accessorFn: (row) => row?.node?.receiverServiceCentreName,
        enableColumnFilter: true,
        meta: {
          width: '20%',
          filterMaps: { list: filterMapping?.members?.filterMapping?.serviceCenter || [] },
        },
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
        id: 'amount',
        header: 'Amount',
        accessorFn: (row) => row?.node?.cashAmount,
        cell: (props) => amountConverter(props?.row?.original?.node?.cashAmount || 0),
        enableColumnFilter: true,
        filterFn: 'amount',
        meta: {
          isNumeric: true,
        },
      },

      {
        id: '_actions',
        header: '',
        cell: (props) => (
          <TablePopover
            node={props?.row?.original?.node}
            items={[
              {
                title: 'viewDetails',
                aclKey: 'CBS_TRANSFERS_CASH_IN_TRANSIT_TRANSFER',
                action: 'VIEW',
                onClick: () => {
                  router.push(
                    `/${ROUTES.CBS_TRANSFER_CASH_IN_TRANSIT_DETAILS}?id=${props?.row?.original?.node?.id}`
                  );
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
    [t, filterMapping?.members?.filterMapping?.serviceCenter]
  );

  const selectedTransfer = rowData?.find(
    (transfer) => transfer?.node?.id === router.query['id']
  )?.node;

  return (
    <>
      <PageHeader heading="Cash in Transit Transfer" tabItems={CASH_IN_TRANSIT_TAB_ITEMS} />

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
                code: row?.node?.transactionCode,
              },
            },
            undefined,
            { shallow: true }
          );
          modalProps.onToggle();
        }}
        menu="TRANSFERS"
      />

      <CashInTransitTransferAproveModal
        transfer={selectedTransfer as CashInTransitInfo}
        approveModal={modalProps}
      />
    </>
  );
};

export default CashTransitTransferList;
