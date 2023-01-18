import React from 'react';

import { Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        date: Record<'local' | 'en' | 'np', string> | null | undefined;
        accountName: string | null | undefined;
        installmentNo: string | null | undefined;
        interestRate: string | null | undefined;
        amount: string | 0;
        paymentType: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const UpcomingLoanPaymentTable = ({ data }: ILoanPaymentScheduleTableProps) => {
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
            link={`${ROUTES.CBS_ACCOUNT_SAVING_DETAILS}?id=${props.cell.row.original?.sn}`}
          />
        ),
        meta: {
          width: '40%',
        },
      },
      {
        header: 'Installment No',
        accessorKey: 'installmentNo',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interestRate',
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Amount',
        accessorKey: 'amount',
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
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> isStatic data={data ?? []} isDetailPageTable columns={columns} />;
};
