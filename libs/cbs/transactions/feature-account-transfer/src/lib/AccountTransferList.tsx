import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  TransferType,
  useGetAccountTransferFilterMappingQuery,
  useGetAccountTransferListDataQuery,
} from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getFilterQuery,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

const transferType = {
  [TransferType.Self]: 'Self Transfer',
  [TransferType.Member]: 'Member to Member',
};

/* eslint-disable-next-line */
export interface AccountTransferListProps {}

export const AccountTransferList = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const { data: accountTransferFilterMapping } = useGetAccountTransferFilterMappingQuery();
  const { data, isFetching } = useGetAccountTransferListDataQuery({
    pagination: getPaginationQuery(),
    filter: getFilterQuery(),
  });

  const rowData = useMemo(() => data?.transaction?.listTransfer?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: t['accountTransferListDate'],
        accessorKey: 'node.date.local',
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.date)}</Text>,
        enableColumnFilter: true,
        filterFn: 'dateTime',
        meta: {
          width: '200px',
        },
      },
      {
        header: t['accountTransferListTransactionId'],
        accessorFn: (row) => row?.node?.transactionCode,
        meta: {
          width: '300px',
        },
      },
      {
        id: 'transferType',
        enableColumnFilter: true,
        header: t['accountTransferListTransactionType'],
        accessorFn: (row) => (row?.node?.transferType ? transferType[row?.node?.transferType] : ''),
        meta: {
          filterMaps: {
            comparator: 'CONTAINS',
            list: accountTransferFilterMapping?.transaction?.filterMapping?.transfer?.type,
          },
        },
      },
      {
        id: 'amount',
        header: t['accountTransferListAmount'],
        meta: {
          isNumeric: true,
        },
        enableColumnFilter: true,
        filterFn: 'amount',
        accessorFn: (row) => (row?.node?.amount ? amountConverter(row?.node?.amount) : '-'),
      },

      {
        id: '_actions',
        header: '',
        cell: (props) =>
          props?.row?.original?.node && (
            <TablePopover
              node={props?.row?.original?.node}
              items={[
                {
                  title: t['transDetailViewDetail'],
                  aclKey: 'CBS_TRANSACTIONS_ACCOUNT_TRANSFER',
                  action: 'VIEW',
                  onClick: (row) => {
                    router.push(
                      `${ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_DETAILS}?id=${row?.transactionCode}`
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
    [t, rowData]
  );

  return (
    <>
      <TransactionPageHeader
        heading={`${t['accountTransferListAccountTransferList']} - ${featureCode?.accountTransferList}`}
        // tabItems={tabList}
        buttonLabel={t['accountTransferListNewAccountTransfer']}
        buttonHandler={() => router.push(ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_ADD)}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(
            `${ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_DETAILS}?id=${row?.node?.transactionCode}`
          )
        }
        pagination={{
          total: data?.transaction?.listTransfer?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listTransfer?.pageInfo,
        }}
        searchPlaceholder={t['accountTransferListSearch']}
        menu="TRANSACTIONS"
      />
    </>
  );
};

export default AccountTransferList;
