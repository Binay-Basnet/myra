import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { TransferType, useGetAccountTransferListDataQuery } from '@coop/cbs/data-access';
import { TransactionPageHeader } from '@coop/cbs/transactions/ui-components';
import { Column, Table } from '@coop/shared/table';
import { TablePopover } from '@coop/shared/ui';
import { featureCode, getRouterQuery, useTranslation } from '@coop/shared/utils';

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

  const { data, isFetching } = useGetAccountTransferListDataQuery(
    {
      pagination: getRouterQuery({ type: ['PAGINATION'] }),
    },
    {
      staleTime: 0,
    }
  );

  const rowData = useMemo(() => data?.transaction?.listTransfer?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['accountTransferListDate'],
        accessorFn: (row) => row?.node?.date ?? 'N/A',
      },
      {
        header: t['accountTransferListTransactionId'],
        accessorFn: (row) => row?.node?.ID,
      },
      {
        header: t['accountTransferListTransactionType'],
        accessorFn: (row) => (row?.node?.transferType ? transferType[row?.node?.transferType] : ''),
        meta: {
          width: '40%',
        },
      },
      {
        header: t['accountTransferListAmount'],
        accessorFn: (row) => row?.node?.amount,
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
                  onClick: (row) => {
                    router.push(`/transactions/account-transfer/view?id=${row?.ID}`);
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
    [t]
  );

  return (
    <>
      <TransactionPageHeader
        heading={`${t['accountTransferListAccountTransferList']} - ${featureCode?.accountTransferList}`}
        // tabItems={tabList}
        buttonLabel={t['accountTransferListNewAccountTransfer']}
        buttonHandler={() => router.push('/transactions/account-transfer/add')}
      />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.ID)}
        isLoading={isFetching}
        columns={columns}
        pagination={{
          total: data?.transaction?.listTransfer?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listTransfer?.pageInfo,
        }}
        searchPlaceholder={t['accountTransferListSearch']}
      />
    </>
  );
};

export default AccountTransferList;
