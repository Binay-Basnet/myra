import { useMemo } from 'react';

import { Column, Table } from '@coop/shared/table';
import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data: ({
    installmentDate: string;
    installmentNo: number;
    interest: string;
    payment: string;
    principal: string;
    remainingPrincipal: string;
  } | null)[];
  total: string;
}

export const LoanPaymentScheduleTable = ({ data, total }: ILoanPaymentScheduleTableProps) => {
  const columns = useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'Installment No.',
        footer: 'Total Cost of Loan',
        accessorFn: (row) => row?.installmentNo,
        meta: {
          Footer: {
            colspan: 4,
          },
        },
      },
      {
        header: 'Principal',
        accessorFn: (row) => amountConverter(row?.principal ?? 0),
        meta: {
          isNumeric: true,
          Footer: {
            display: 'none',
          },
        },
      },
      {
        header: 'Interest',
        accessorFn: (row) => amountConverter(row?.interest ?? 0),
        meta: {
          isNumeric: true,
          Footer: {
            display: 'none',
          },
        },
      },
      {
        header: 'Payment',
        accessorFn: (row) => amountConverter(row?.payment ?? 0),
        meta: {
          isNumeric: true,
          Footer: {
            display: 'none',
          },
        },
      },
      {
        header: 'Remaining Principal',
        footer: total,
        accessorFn: (row) => amountConverter(row?.remainingPrincipal ?? 0),
        meta: {
          isNumeric: true,
        },
      },
    ],
    []
  );

  return (
    <Table variant="report" size="small" isStatic showFooter data={data ?? []} columns={columns} />
  );
};
