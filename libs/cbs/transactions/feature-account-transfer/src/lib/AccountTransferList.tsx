import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { TablePopover, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import {
  Filter_Mode,
  TransferType,
  useGetAccountTransferListDataQuery,
} from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { localizedDate, ROUTES } from '@coop/cbs/utils';
import {
  amountConverter,
  featureCode,
  getPaginationQuery,
  useTranslation,
} from '@coop/shared/utils';

// const tabList = [
//   {
//     title: 'memberNavActive',
//     key: 'ACTIVE',
//   },
//   {
//     title: 'memberNavInactive',
//     key: 'SUBMITTED',
//   },
// ];

const transferType = {
  [TransferType.Self]: 'Self Transfer',
  [TransferType.Member]: 'Member to Member',
};

/* eslint-disable-next-line */
export interface AccountTransferListProps {}

export const AccountTransferList = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchTerm = router?.query['search'] as string;

  const { data, isFetching } = useGetAccountTransferListDataQuery(
    {
      pagination: getPaginationQuery(),
      filter: {
        id: searchTerm,
        transactionId: searchTerm,
        filterMode: Filter_Mode.Or,
      },
    },
    {
      staleTime: 0,
      enabled: searchTerm !== 'undefined',
    }
  );

  const rowData = useMemo(() => data?.transaction?.listTransfer?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['accountTransferListDate'],
        cell: (row) => <Text>{localizedDate(row?.row?.original?.node?.date)}</Text>,
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
        header: t['accountTransferListTransactionType'],
        accessorFn: (row) => (row?.node?.transferType ? transferType[row?.node?.transferType] : ''),
      },
      {
        header: t['accountTransferListAmount'],
        meta: {
          isNumeric: true,
        },
        accessorFn: (row) => (row?.node?.amount ? amountConverter(row?.node?.amount) : '-'),
      },
      // {
      //   header: 'Payment Mode',
      //   accessorFn: (row) => row?.node?.paymentMode,
      // },
      // {
      //   header: 'Deposited By',
      //   accessorFn: (row) => row?.node?.processedBy,
      // },

      // {
      //   header: 'Deposit Date',
      //   accessorFn: (row) => row?.node?.date?.split(' ')[0] ?? 'N/A',
      // },
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
          width: '50px',
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
