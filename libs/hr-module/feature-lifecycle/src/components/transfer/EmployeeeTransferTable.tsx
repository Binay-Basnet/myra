import React from 'react';

import { Column, Table } from '@myra-ui/table';

import { localizedDate } from '@coop/cbs/utils';

interface ILoanPaymentScheduleTableProps {
  data:
    | {
        sn: number;
        transferredFrom: string | null | undefined;
        transferredTo: string | null | undefined;
        transferDate: Record<'local' | 'en' | 'np', string> | null | undefined;
      }[];
  transferType: string;
  //   data: MemberPaymentView[] | null | undefined;
}

export const EmployeeTransferHistoryTable = ({
  data,
  transferType,
}: ILoanPaymentScheduleTableProps) => {
  const columns = React.useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'S.N.',
        accessorKey: 'sn',
        meta: {
          width: '25px',
        },
      },
      {
        header: () => `Previous ${transferType}`,

        accessorKey: 'transferredFrom',
      },
      {
        header: () => `New ${transferType}`,

        accessorKey: 'transferredTo',
      },
      {
        header: 'Date of transfer',
        accessorKey: 'transferDate',
        accessorFn: (row) => localizedDate(row?.transferDate),
      },
    ],
    [transferType]
  );

  return (
    <Table<typeof data[0]>
      size="report"
      isStatic
      data={data ?? []}
      columns={columns}
      variant="report"
    />
  );
};
