import { useMemo } from 'react';

import { Column, DetailsCard, Table, Text } from '@myra-ui';

import { BalanceType, EbankingTransaction } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

type CustomTransactionItem = EbankingTransaction & {
  index?: string | number;
};

interface ITransactionTableProps {
  txnList: CustomTransactionItem[];
  isClosed?: boolean;
}

export const RecentTransactions = ({ txnList, isClosed }: ITransactionTableProps) => {
  const transactionListWithIndex =
    txnList?.map((trans, index) => ({
      index: index + 1,
      ...trans,
    })) ?? [];

  const getTypeProps = (typeVariant: BalanceType | null | undefined) => {
    switch (typeVariant) {
      case 'DR':
        return { color: 'accent.600', text: typeVariant };

      case 'CR':
        return { color: 'accent.100', text: typeVariant };

      default:
        return { color: '', text: '' };
    }
  };

  const columns = useMemo<Column<CustomTransactionItem>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
      },
      {
        header: 'Transaction ID',
        accessorKey: 'transactionId',
        cell: (props) => (
          <RedirectButton
            link={`${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${props.getValue()}`}
            label={props.getValue() as string}
          />
        ),
      },
      {
        header: 'Type',
        accessorKey: 'transactionType',
        cell: (props) => (
          <Text fontWeight="Medium" fontSize="s3" lineHeight="17px" textTransform="capitalize">
            {props.row?.original?.transactionType?.replace(/_/gi, ' ')?.toLowerCase()}
          </Text>
        ),
      },

      {
        header: 'Account / Particulars',
        accessorKey: 'name',
        cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        meta: {
          width: '33%',
        },
      },
      {
        header: 'Debit',
        accessorFn: (row) => amountConverter(row?.debit ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Credit',
        accessorFn: (row) => amountConverter(row?.credit ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Balance',
        id: 'balance',
        accessorFn: (row) => amountConverter(row?.currentBalance ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: ' ',
        accessorFn: (row) => row?.balanceType,
        cell: (props) => (
          <Text
            fontSize="s3"
            fontWeight="Regular"
            color={getTypeProps(props?.row?.original?.balanceType)?.color}
          >
            {getTypeProps(props?.row?.original?.balanceType)?.text}
          </Text>
        ),
      },
      // {
      //   header: 'Total',
      //   accessorKey: 'amount',
      //   cell: (props) =>
      //     props.getValue() ? (
      //       <Text
      //         fontWeight="500"
      //         fontSize="r1"
      //         color={
      //           props?.row?.original?.transactionDirection === EbankingTransactionDirection.Incoming
      //             ? 'primary.500'
      //             : 'danger.500'
      //         }
      //       >
      //         {amountConverter(props?.getValue() as string)}
      //       </Text>
      //     ) : (
      //       'N/A'
      //     ),
      //   meta: {
      //     isNumeric: true,
      //     width: '33%',
      //   },
      // },
    ],
    []
  );

  return (
    <DetailsCard
      title={isClosed ? 'Past Transactions' : 'Recent Transactions'}
      bg="white"
      hasTable
      // leftBtn={
      //   <Button
      //     variant="ghost"
      //     onClick={() =>
      //       router.push(`/savings/details/${accountDetails?.accountId}?tab=transactions`)
      //     }
      //   >
      //     View all transactions
      //   </Button>
      // }
    >
      <Table isDetailPageTable isStatic data={transactionListWithIndex} columns={columns} />
    </DetailsCard>
  );
};
