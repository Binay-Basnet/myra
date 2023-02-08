import React from 'react';
import { useRouter } from 'next/router';

import { Column, Table } from '@myra-ui/table';

import { localizedDate, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        id: string | null | undefined;
        date: Record<'local' | 'en' | 'np', string> | null | undefined;
        type: string | null | undefined;
        toFrom: string | null | undefined;
        count: string | null | undefined;
        shareCr: number | null | undefined;
        shareDr: number | null | undefined;
        balance: number | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const ShareTableComponent = ({ data }: ILoanPaymentScheduleTableProps) => {
  const router = useRouter();
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'Date',
        accessorKey: 'date',
        cell: (props) =>
          props.getValue() ? localizedDate(props?.cell?.row?.original?.date) : 'N/A',
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
        header: 'Share Count',
        accessorKey: 'count',
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

  return (
    <Table<typeof data[0]>
      isStatic
      data={data ?? []}
      rowOnClick={(row) => router.push(`${ROUTES.CBS_SHARE_REGISTER_DETAILS}?id=${row?.id}`)}
      isDetailPageTable
      columns={columns}
    />
  );
};
