import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { ApprovalStatusCell, Column, PageHeader, Table, TablePopover } from '@myra-ui';

import {
  IbtStatus,
  IbtType,
  ServiceCenterActivityDetails,
  useGetServiceCenterTransferListQuery,
} from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, featureCode, getRouterQuery } from '@coop/shared/utils';

import { IBTCompleteModal } from '../components';

const IBT_TABS = [
  {
    title: 'Sent',
    key: 'SENT',
  },
  {
    title: 'Received',
    key: 'RECEIVED',
  },
];

const ibtStatusVariant: Record<IbtStatus, 'success' | 'failure' | 'pending'> = {
  COMPLETED: 'success',
  PENDING: 'pending',
};

/* eslint-disable-next-line */
export interface CashTransferListProps {}

export const CashTransferList = () => {
  const router = useRouter();

  const modalProps = useDisclosure();

  const { data, isFetching } = useGetServiceCenterTransferListQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
      transferMode: (router?.query['objState'] ?? 'SENT') as IbtType,
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
        header: 'Transfer Date',
        accessorFn: (row) => localizedDate(row?.node?.transactionDate),
        cell: (props) => localizedDate(props?.row?.original?.node?.transactionDate),
      },
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.journalId,
      },
      {
        header: 'Sender Service Center',
        accessorFn: (row) => row?.node?.sender,
        meta: {
          width: '25%',
        },
      },
      {
        header: 'Receiver Service Center',
        accessorFn: (row) => row?.node?.receiver,
        meta: {
          width: '25%',
        },
      },
      {
        header: 'Status',
        accessorFn: (row) => row?.node?.status,
        cell: (props) => (
          <ApprovalStatusCell
            status={props.row.original?.node?.status as string}
            variant={ibtStatusVariant[props.row.original?.node?.status as IbtStatus]}
          />
        ),
      },
      {
        header: 'Cash Amount',
        meta: {
          isNumeric: true,
        },
        accessorFn: (row) => amountConverter(row?.node?.amount as string),
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
                // aclKey: 'CBS_TRANSFERS_CASH_IN_TRANSIT_TRANSFER',
                action: 'VIEW',
                onClick: () => {
                  router.push(
                    {
                      pathname: `/${ROUTES.CBS_TRANSFER_INTER_SERVICE_TRANS_DETAILS}`,
                      query: {
                        id: props?.row?.original?.node?.id,
                        objState: router?.query['objState'],
                      },
                    },
                    undefined,
                    { shallow: true }
                  );
                },
              },
            ]}
          />
        ),
        meta: {
          width: '50px',
        },
      },
    ],
    [router]
  );

  const selectedTransfer = rowData?.find(
    (transfer) => transfer?.node?.id === router.query['id']
  )?.node;

  return (
    <>
      <PageHeader
        heading={`Inter Service Center Transaction - ${featureCode.serviceCenterTransferList}`}
        tabItems={IBT_TABS}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
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
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listServiceCenterCashTransfer?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listServiceCenterCashTransfer?.pageInfo,
        }}
        noDataTitle="service center cash transfer list"
        menu="TRANSFERS"
      />

      <IBTCompleteModal
        transfer={selectedTransfer as ServiceCenterActivityDetails}
        approveModal={modalProps}
      />
    </>
  );
};

export default CashTransferList;
