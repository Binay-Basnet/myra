import { Table } from '@coop/shared/table';

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

export const LoanPaymentScheduleTable = ({ data, total }: ILoanPaymentScheduleTableProps) => (
  <Table
    variant="report"
    size="small"
    isStatic
    showFooter
    data={data ?? []}
    columns={[
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
        footer: total,
        accessorKey: 'remainingPrincipal',
        meta: {
          isNumeric: true,
        },
      },
    ]}
  />
);
