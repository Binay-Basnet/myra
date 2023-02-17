import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Column, PageHeader, Table, TablePopover } from '@myra-ui';

import { AllTransactionType, useGetServiceCenterTransferListQuery } from '@coop/cbs/data-access';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter, featureCode, getRouterQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CashTransferListProps {}

export const CashTransferList = () => {
  const router = useRouter();
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
        header: 'Transfer Date',
        accessorFn: (row) => localizedDate(row?.node?.transactionDate),
        cell: (props) => localizedDate(props?.row?.original?.node?.transactionDate),
      },
      {
        header: 'ID',
        accessorFn: (row) => row?.node?.id,
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
                    `/${ROUTES.CBS_TRANSFER_INTER_SERVICE_TRANS_DETAILS}?id=${props?.row?.original?.node?.id}`
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
    []
  );
  return (
    <>
      <PageHeader
        heading={`Inter Service Center Transaction - ${featureCode.serviceCenterTransferList}`}
        // tabItems={tabList}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        rowOnClick={(row) =>
          router.push(
            `${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${row?.node?.id}&txnType=${AllTransactionType.Transfer}`
          )
        }
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
