import React from 'react';

import { Chips, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        date: Record<'local' | 'en' | 'np', string> | null | undefined;
        accountName?: string | null | undefined;
        paymentType?: string | null | undefined;
        amount?: string | 0;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const UpcomingPaymentTable = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
      },
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) => localizedDate(props.cell.row.original.date),
      },
      {
        header: 'Account Name',
        accessorKey: 'accountName',
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Payment Type',
        accessorKey: 'paymentType',
        cell: (props) => {
          const value = props.getValue() as string;

          return (
            <Chips
              variant="solid"
              theme={value !== 'LOAN' ? 'success' : 'danger'}
              size="md"
              type="label"
              label={value}
            />
          );
        },
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) =>
          props.getValue() ? (
            <Text color="primary.500">{amountConverter(props.getValue() as string)}</Text>
          ) : (
            'N/A'
          ),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> isStatic data={data ?? []} isDetailPageTable columns={columns} />;
};
