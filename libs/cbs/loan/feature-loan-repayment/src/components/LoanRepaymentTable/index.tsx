import { useMemo } from 'react';

import { LoanInstallment } from '@coop/cbs/data-access';
import { Column, Table } from '@myra-ui/table';
import { Text } from '@myra-ui';

interface ILoanPaymentScheduleTableProps {
  data: LoanInstallment[];

  total: string;
}

export const LoanPaymentScheduleTable = ({ data, total }: ILoanPaymentScheduleTableProps) => {
  const columns = useMemo<Column<LoanInstallment>[]>(
    () => [
      {
        header: 'S.N.',
        footer: 'Total Cost of Loan',
        accessorKey: 'installmentNo',
        meta: {
          Footer: {
            colspan: 5,
          },
        },
      },
      {
        header: 'Installment Date',
        accessorKey: 'installmentDate',
        meta: {
          isNumeric: true,
          Footer: {
            display: 'none',
          },
        },
      },
      {
        header: 'Payment',
        accessorKey: 'payment',
        meta: {
          isNumeric: true,
          Footer: {
            display: 'none',
          },
        },
      },
      {
        header: 'Principal',
        accessorKey: 'principal',
        meta: {
          isNumeric: true,
          Footer: {
            display: 'none',
          },
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interest',
        meta: {
          isNumeric: true,
          Footer: {
            display: 'none',
          },
        },
      },

      {
        header: 'Remaining Amount',

        accessorKey: 'remainingPrincipal',
        meta: {
          isNumeric: true,
        },
        Footer: {
          display: 'none',
        },
      },
      {
        header: 'Status',
        footer: total,
        accessorKey: 'paid',
        cell: (props) => {
          const value = props.getValue();

          return (
            <Text
              textAlign="center"
              fontSize="r1"
              fontWeight="500"
              color={value ? 'primary.500' : 'gray.600'}
            >
              {value ? 'Paid' : '-'}
            </Text>
          );
        },
      },
    ],
    []
  );
  return (
    <Table size="small" variant="report" isStatic showFooter data={data ?? []} columns={columns} />
  );
};
