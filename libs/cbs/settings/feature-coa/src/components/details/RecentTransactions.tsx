import { useMemo } from 'react';

import { Button, DetailsCard, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { BalanceType } from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { useCOAAccountDetails } from '../../hooks';

export const RecentTransactions = () => {
  const { accountDetails } = useCOAAccountDetails();

  const getTypeProps = (typeVariant: BalanceType | null | undefined) => {
    switch (typeVariant) {
      case 'DR':
        return { text: typeVariant };

      case 'CR':
        return { text: typeVariant };

      default:
        return { text: '-' };
    }
  };

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
        cell: (props) => (
          <RedirectButton
            link={`${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${props.getValue()}`}
            label={props.getValue() ? (`#${props.getValue()}` as string) : 'N/A'}
          />
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
        header: 'Debit',
        accessorKey: 'debit',
        cell: (props) => (props.getValue() ? props.getValue() : '-'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Credit',
        accessorKey: 'credit',
        cell: (props) => (props.getValue() ? props.getValue() : '-'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Balance',
        id: 'balance',
        accessorFn: (row) => amountConverter(row?.total ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: ' ',
        accessorFn: (row) => row?.balanceType,
        cell: (props) => (
          <Text fontSize="s3" fontWeight="Regular">
            {getTypeProps(props?.row?.original?.balanceType)?.text}
          </Text>
        ),
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
