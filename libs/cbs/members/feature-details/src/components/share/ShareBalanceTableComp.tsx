import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        date: string | null | undefined;
        type: string | null | undefined;
        toFrom: string | null | undefined;
        shareCr: number | null | undefined;
        shareDr: number | null | undefined;
        balance: number | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const ShareTableComponent = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorKey: 'date',
      },
      {
        header: 'Type',
        accessorKey: 'type',
        meta: {
          width: '25%',
        },
      },
      {
        header: 'To-From',
        accessorKey: 'toFrom',
      },
      {
        header: 'Share Cr',
        accessorKey: 'shareCr',
        cell: (props) => amountConverter(props.getValue() as string),
      },
      {
        header: 'Share Dr',
        accessorKey: 'shareDr',
        cell: (props) => amountConverter(props.getValue() as string),
      },
      {
        header: 'Balance',
        accessorKey: 'balance',
        cell: (props) => amountConverter(props.getValue() as string),
      },
    ],
    []
  );

  return <Table<typeof data[0]> isStatic data={data ?? []} isDetailPageTable columns={columns} />;
};
