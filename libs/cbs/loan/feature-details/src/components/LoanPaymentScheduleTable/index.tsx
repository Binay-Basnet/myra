import { useMemo } from 'react';

import { Column, Table } from '@myra-ui/table';

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
  totalInterest: string | number;
  totalPrincipal: string | number;
}

export const LoanPaymentScheduleTable = ({
  data,
  total,
  totalInterest,
  totalPrincipal,
}: ILoanPaymentScheduleTableProps) => {
  const columns = useMemo<Column<typeof data[0]>[]>(
    () => [
      {
        header: 'Installment No.',
        footer: 'Total Cost of Loan',
        accessorFn: (row) => row?.installmentNo,
      },
      {
        header: 'Principal',
        accessorFn: (row) => amountConverter(row?.principal ?? 0),
        footer: () => amountConverter(totalPrincipal),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorFn: (row) => amountConverter(row?.interest ?? 0),
        footer: () => amountConverter(totalInterest),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Payment',
        accessorFn: (row) => amountConverter(row?.payment ?? 0),
        meta: {
          isNumeric: true,
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
