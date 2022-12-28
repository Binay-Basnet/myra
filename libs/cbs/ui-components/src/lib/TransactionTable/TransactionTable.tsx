import { useMemo } from 'react';

import { Column, Table, Text } from '@myra-ui';

import { EbankingTransaction, EbankingTransactionDirection } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export type CustomTransactionItem = EbankingTransaction & {
  index?: string;
};

interface ITransactionTableProps {
  data: CustomTransactionItem[];
  hasIndex?: boolean;
}

export const TransactionTable = ({ data, hasIndex = false }: ITransactionTableProps) => {
  const transactionList = hasIndex
    ? data?.map((trans, index) => ({
        index: String(index + 1),
        ...trans,
      })) ?? []
    : data;

  const columns = useMemo<Column<CustomTransactionItem>[]>(
    () => [
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => localizedDate(props?.row?.original?.date),
      },
      {
        header: 'Transaction ID',
        accessorKey: 'transactionId',
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
        header: 'Total',
        accessorKey: 'amount',
        cell: (props) =>
          props.getValue() ? (
            <Text
              fontWeight="500"
              fontSize="r1"
              color={
                props.row?.original?.transactionDirection === EbankingTransactionDirection.Incoming
                  ? 'primary.500'
                  : 'danger.500'
              }
            >
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

  const transactionColumns: Column<CustomTransactionItem>[] = hasIndex
    ? [
        {
          header: 'SN',
          accessorKey: 'index',
          cell: (props) => (props.getValue() ? props.getValue() : 'N/A'),
        },
        ...columns,
      ]
    : columns;

  return <Table isDetailPageTable isStatic data={transactionList} columns={transactionColumns} />;
};
