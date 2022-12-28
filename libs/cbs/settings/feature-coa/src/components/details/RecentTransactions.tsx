import { useMemo } from 'react';

import { Button, DetailsCard, Text } from '@myra-ui';
import { BalanceAmountCell, Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';

import { useCOAAccountDetails } from '../../hooks';

export const RecentTransactions = () => {
  const { accountDetails } = useCOAAccountDetails();

  const recentTransactionsList =
    useMemo(
      () =>
        accountDetails?.recentTxns?.map((detail, index) => ({
          index: String(index + 1),
          ...detail,
        })),
      [accountDetails?.recentTxns]
    ) ?? [];

  const columns = useMemo<Column<typeof recentTransactionsList[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => localizedDate(props?.row?.original?.date),
      },
      {
        header: 'Transaction ID',
        accessorKey: 'txnId',
        cell: (props) =>
          props.getValue() ? (
            <Text fontWeight="500" fontSize="r1" color="primary.500">
              #{props.getValue() as string}
            </Text>
          ) : (
            'N/A'
          ),
      },
      {
        header: 'Particulars',
        accessorKey: 'particulars',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Total',
        accessorKey: 'total',
        cell: (props) => (
          <BalanceAmountCell
            amount={props?.row?.original?.total ?? 0}
            type={props?.row?.original?.txnType?.toLowerCase()}
          />
        ),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
    ],
    []
  );

  return (
    <DetailsCard
      title="Recent Transactions"
      bg="white"
      hasTable
      leftBtn={<Button variant="ghost">View All Transactions</Button>}
    >
      <Table isDetailPageTable isStatic data={recentTransactionsList} columns={columns} />
    </DetailsCard>
  );
};