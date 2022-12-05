import { useMemo } from 'react';

import { Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LoanInstallment } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data: LoanInstallment[];
  nextInstallmentNumber?: number;
  total: string;
}

export const LoanPaymentScheduleTable = ({
  data,
  total,
  nextInstallmentNumber,
}: ILoanPaymentScheduleTableProps) => {
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
        cell: (props) => amountConverter(props.getValue() as string),

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
        cell: (props) => amountConverter(props.getValue() as string),

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
        cell: (props) => amountConverter(props.getValue() as string),

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
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
        Footer: {
          display: 'none',
        },
      },
      {
        header: 'Status',
        footer: () => amountConverter(total),
        accessorKey: 'paid',
        cell: (props) => {
          const installmentNo = props?.row?.original?.installmentNo;
          const value = props.getValue();

          return (
            <Text
              textAlign="center"
              fontSize="r1"
              fontWeight="500"
              color={
                installmentNo === nextInstallmentNumber
                  ? 'danger.500'
                  : value
                  ? 'primary.500'
                  : 'gray.600'
              }
            >
              {installmentNo === nextInstallmentNumber ? 'Current' : value ? 'Paid' : '-'}
            </Text>
          );
        },
      },
    ],
    [nextInstallmentNumber, total]
  );
  return (
    <Table size="small" variant="report" isStatic showFooter data={data ?? []} columns={columns} />
  );
};
