import { useMemo } from 'react';

import { Tags, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LoanInstallment } from '@coop/cbs/data-access';
import { amountConverter } from '@coop/shared/utils';

interface ILoanPaymentScheduleTableProps {
  data: LoanInstallment[];
  nextInstallmentNumber?: number;
  total: string;
  totalInterest: string | number;
  totalPrincipal: string | number;
}

export const LoanPaymentScheduleTable = ({
  data,
  total,
  totalInterest,
  totalPrincipal,
  nextInstallmentNumber,
}: ILoanPaymentScheduleTableProps) => {
  const columns = useMemo<Column<LoanInstallment>[]>(
    () => [
      {
        header: 'S.N.',
        footer: 'Total Cost of Loan',
        accessorKey: 'installmentNo',
        meta: {
          width: '50px',
          Footer: {
            colspan: 2,
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
        header: 'Principal',
        accessorKey: 'principal',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(totalPrincipal),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interest',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(totalInterest),
        meta: {
          isNumeric: true,
        },
      },

      {
        header: 'Payment',
        accessorKey: 'payment',
        cell: (props) => amountConverter(props.getValue() as string),

        meta: {
          isNumeric: true,
        },
      },

      {
        header: 'Remaining Amount',

        accessorKey: 'remainingPrincipal',
        cell: (props) => amountConverter(props.getValue() as string),
        footer: () => amountConverter(total) || '-',

        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Status',
        accessorKey: 'paid',

        cell: (props) => {
          const installmentNo = props?.row?.original?.installmentNo;
          const value = props.getValue();

          return (
            <Text
              textAlign="center"
              fontSize="s3"
              fontWeight="500"
              color={
                installmentNo === nextInstallmentNumber
                  ? 'info.500'
                  : value
                  ? 'primary.500'
                  : 'gray.600'
              }
            >
              {installmentNo === nextInstallmentNumber ? (
                <Tags borderRadius="br5" label="Current" type="tag" labelColor="info.500" />
              ) : value ? (
                <Tags borderRadius="br5" label="Paid" type="tag" labelColor="primary.500" />
              ) : (
                '-'
              )}
            </Text>
          );
        },
      },
    ],
    [nextInstallmentNumber, total]
  );
  return (
    <Table size="report" variant="report" isStatic showFooter data={data ?? []} columns={columns} />
  );
};
