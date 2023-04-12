import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        name: string | null | undefined;
        sn: number;
        dateJoined: Record<'local' | 'en' | 'np', string> | null | undefined;
        position: string | null | undefined;
        contact: string | null | undefined;
      }[];

  //   data: MemberPaymentView[] | null | undefined;
}

export const MemberListTableCommitte = ({ data }: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'SN ',
        accessorKey: 'sn',
      },

      {
        header: 'Member Name',
        accessorKey: 'name',
      },
      {
        header: 'Position',
        accessorKey: 'position',
      },
      {
        header: 'Phone No',
        accessorKey: 'contact',
      },
      {
        header: 'Date Joined',
        accessorKey: 'dateJoined',
        accessorFn: (row) => localizedDate(row?.dateJoined),
      },
    ],
    []
  );

  return <Table<typeof data[0]> isStatic data={data ?? []} isDetailPageTable columns={columns} />;
};
