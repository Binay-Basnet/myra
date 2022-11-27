import React from 'react';

import { Column, Table } from '@coop/shared/table';
import { Tags } from '@myra-ui';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        date?: string | null | undefined;
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
            <Tags
              type="chip"
              label={value}
              bg={value !== 'LOAN' ? 'primary.100' : 'danger.100'}
              labelColor={value !== 'LOAN' ? 'primary.500' : 'danger.500'}
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
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return <Table<typeof data[0]> size="report" isStatic data={data ?? []} columns={columns} />;
};
