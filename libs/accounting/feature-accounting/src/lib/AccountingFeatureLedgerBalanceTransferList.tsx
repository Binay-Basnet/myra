import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { AccountingPageHeader } from '@coop/accounting/ui-components';
import {
  AllTransactionType,
  useGetAllTransactionFilterMappingQuery,
  useGetAllTransactionsListQuery,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter, getPaginationQuery } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface DepositListProps {}

export const AccountingFeatureLedgerBalanceTransferList = () => {
  const router = useRouter();

  const { data: allTransactionFilterMapping } = useGetAllTransactionFilterMappingQuery();
  const { data, isFetching } = useGetAllTransactionsListQuery({
    pagination: getPaginationQuery(),
    filter: {
      orConditions: [
        {
          andConditions: [
            {
              column: 'txnType',
              comparator: 'EqualTo',
              value: AllTransactionType.LedgerBalanceTransfer,
            },
          ],
        },
      ],
    },
  });

  const rowData = useMemo(() => data?.transaction?.listAllTransactions?.edges ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: 'date',
        header: 'Date',
        cell: (props) => props?.row?.original?.node?.date?.local?.split(' ')[0] ?? 'N/A',
        accessorKey: 'node.date.local',
        enableColumnFilter: true,
        filterFn: 'dateTime',
      },
      {
        header: 'Transaction Id',
        accessorFn: (row) => row?.node?.id,
      },
      // {
      //   id: 'txnType',
      //   accessorFn: (row) => row?.node?.transactionType,
      //   header: 'Type',
      //   cell: (props) => (
      //     <Box textTransform="capitalize">
      //       {props?.cell?.row?.original?.node?.transactionType?.toLowerCase()?.replace(/_/g, ' ')}
      //     </Box>
      //   ),
      //   enableColumnFilter: true,
      //   meta: {
      //     filterMaps: {
      //       list: allTransactionFilterMapping?.transaction?.filterMapping?.allTransaction?.txnType,
      //     },
      //   },
      // },
      {
        header: 'Note',
        accessorFn: (row) => row?.node?.narration,
        cell: (props) => <Tooltip title={props?.row?.original?.node?.narration as string} />,
        meta: {
          width: '50%',
        },
      },
      {
        id: 'branchId',
        header: 'Service Center',
        accessorFn: (row) => row?.node?.branchName,
        enableColumnFilter: true,
        meta: {
          filterMaps: {
            list: allTransactionFilterMapping?.transaction?.filterMapping?.allTransaction?.branchId,
          },
        },
      },

      {
        id: 'amount',
        header: 'Amount',
        accessorFn: (row) => row?.node?.amount,
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
          width: '2%',
        },
        enableColumnFilter: true,
        filterFn: 'amount',
      },
    ],
    [
      allTransactionFilterMapping?.transaction?.filterMapping?.allTransaction?.branchId,
      // allTransactionFilterMapping?.transaction?.filterMapping?.allTransaction?.txnType,
    ]
  );

  return (
    <>
      <AccountingPageHeader heading="Ledger Balance Transfer" />

      <Table
        data={rowData}
        getRowId={(row) => String(row?.node?.id)}
        isLoading={isFetching}
        columns={columns}
        rowOnClick={(row) =>
          router.push(`${ROUTES.ACCOUNTING_LEDGER_BALANCE_TRANSFER_DETAILS}?id=${row?.node?.id}`)
        }
        pagination={{
          total: data?.transaction?.listAllTransactions?.totalCount ?? 'Many',
          pageInfo: data?.transaction?.listAllTransactions?.pageInfo,
        }}
        // searchPlaceholder="Search all transactions"
        // menu="TRANSACTIONS"
      />
    </>
  );
};

export default AccountingFeatureLedgerBalanceTransferList;
