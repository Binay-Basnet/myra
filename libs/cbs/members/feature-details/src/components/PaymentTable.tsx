import React from 'react';

import { Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        id: string | null | undefined;
        sn: number;
        date: Record<'local' | 'en' | 'np', string> | null | undefined;
        accountName?: string | null | undefined;
        paymentType?: string | null | undefined;
        amount?: string | 0;
        installmentNo?: string | null | undefined;
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
        cell: (props) => (
          // id to be sent by BE
          <RedirectButton
            label={props?.row?.original?.accountName}
            link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${props.cell.row.original?.id}`}
          />
        ),
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
            <Text fontWeight="Medium" color="gray.700" lineHeight="125%" fontSize="Regular">
              {value?.replace(/_/g, ' ')}
            </Text>
          );
        },
        meta: {
          width: '30%',
        },
      },
      {
        header: 'Installment No.',
        accessorKey: 'installmentNo',
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
        cell: (props) =>
          props.getValue() ? <Text color="primary.500">{props.getValue() as string}</Text> : 'N/A',
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> isStatic data={data ?? []} isDetailPageTable columns={columns} />;
};
