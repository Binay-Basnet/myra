import { useMemo } from 'react';

import { Column, Table, Text, Tooltip } from '@myra-ui';

import { BalanceType, EbankingTransaction } from '@coop/cbs/data-access';
import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export type CustomTransactionItem = EbankingTransaction & {
  index?: string;
};

interface ITransactionTableProps {
  data: CustomTransactionItem[];
  hasIndex?: boolean;
  isLoading?: boolean;
}
// const routeObj = {
//   DEPOSIT: ROUTES.CBS_TRANS_DEPOSIT_DETAILS,
//   LOAN_REPAYMENT: ROUTES.CBS_TRANS_LOAN_PAYMENT_DETAILS,
//   WITHDRAW: ROUTES.CBS_TRANS_WITHDRAW_DETAILS,
//   LOAN_DISBURSMENT: ROUTES.CBS_TRANS_DEPOSIT_DETAILS,
// };

export const TransactionTable = ({ data, hasIndex = false, isLoading }: ITransactionTableProps) => {
  const transactionList = hasIndex
    ? data?.map((trans, index) => ({
        index: String(index + 1),
        ...trans,
      })) ?? []
    : data;

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

  const columns = useMemo<Column<CustomTransactionItem>[]>(() => {
    let tempColumns: Column<CustomTransactionItem>[] = [
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => localizedDate(props?.row?.original?.date),
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
        cell: (props) => <Tooltip title={(props?.getValue() as string) ?? 'N/A'} />,
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
          <Text fontSize="s3" fontWeight="Regular">
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
      //           props.row?.original?.transactionDirection === EbankingTransactionDirection.Incoming
      //             ? 'primary.500'
      //             : 'danger.500'
      //         }
      //       >
      //         {amountConverter(props?.row?.original?.amount)}
      //       </Text>
      //     ) : (
      //       'N/A'
      //     ),
      //   meta: {
      //     isNumeric: true,
      //     width: '33%',
      //   },
      // },
    ];

    if (hasIndex) {
      tempColumns = [
        {
          header: 'SN',
          accessorKey: 'index',
          cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        },
        ...tempColumns,
      ];
    }

    return tempColumns;
  }, [hasIndex]);

  return (
    <Table
      isDetailPageTable
      isStatic
      size="compact"
      data={transactionList}
      columns={columns}
      isLoading={isLoading}
    />
  );
};
