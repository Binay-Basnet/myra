import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Button, Column, DetailsCard, Table, Text } from '@myra-ui';

import { useAccountDetails, useGetAccountTransactionList } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

export const RecentTransactions = () => {
  const router = useRouter();

  const { accountDetails } = useAccountDetails();

  const { transactionList } = useGetAccountTransactionList({
    accountId: accountDetails?.accountId,
  });

  const transactionListWithIndex =
    transactionList?.map((trans, index) => ({
      index: index + 1,
      ...trans,
    })) ?? [];

  const columns = useMemo<Column<typeof transactionListWithIndex[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => (props.getValue() ? `${props.getValue()}` : 'N/A'),
      },
      {
        header: 'Transaction ID',
        accessorKey: 'accountId',
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
        header: 'Type',
        accessorKey: 'transactionDirection',
        cell: (props) =>
          props.getValue() ? `${(props.getValue() as string).toLowerCase()}` : 'N/A',
      },

      {
        header: 'Account / Particulars',
        accessorKey: 'currentBalance',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) =>
          props.getValue() ? `${amountConverter(props.getValue() as string)}` : '-',
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
      {
        header: 'Fine',
        accessorKey: 'currentBalance',
        cell: (props) => (props.getValue() ? `${props.getValue()}` : '-'),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
      {
        header: 'Rebate',
        accessorKey: 'currentBalance',
        cell: (props) => (props.getValue() ? `${props.getValue()}` : '-'),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
      {
        header: 'Total',
        accessorKey: 'currentBalance',
        cell: (props) =>
          props.getValue() ? (
            <Text fontWeight="500" fontSize="r1" color="primary.500">
              {amountConverter(props.getValue() as string)}
            </Text>
          ) : (
            'N/A'
          ),
        meta: {
          isNumeric: true,
          width: '33%',
        },
      },
    ],
    []
  );

  if (!transactionListWithIndex || Object.keys(transactionListWithIndex).length === 0) return null;

  return (
    <DetailsCard
      title="Recent Transactions"
      bg="white"
      hasTable
      leftBtn={
        <Button
          variant="ghost"
          onClick={() =>
            router.push(`/savings/details/${accountDetails?.accountId}?tab=transactions`)
          }
        >
          View all transactions
        </Button>
      }
    >
      <Table isStatic data={transactionListWithIndex} columns={columns} />
      {/* {transactionList
        ?.slice(0, 5)
        ?.map((item) => item && <TransactionCard transactionItem={item} />)} */}
    </DetailsCard>
  );
};
