import { Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanPaymentSchedule = () => {
  const { loanPreview } = useLoanDetails();

  if (
    !loanPreview?.paymentSchedule?.installments ||
    loanPreview?.paymentSchedule?.installments?.length === 0
  ) {
    return null;
  }

  return (
    <DetailsCard title="Payment Schedule" hasTable>
      <Table
        variant="report"
        size="small"
        isStatic
        showFooter
        data={loanPreview?.paymentSchedule?.installments ?? []}
        columns={[
          {
            header: 'Installment No.',
            footer: 'Total Cost of Loan',
            accessorKey: 'installmentNo',
            meta: {
              Footer: {
                colspan: 4,
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
            header: 'Remaining Principal',
            footer: loanPreview?.paymentSchedule?.total,
            accessorKey: 'remainingPrincipal',
            meta: {
              isNumeric: true,
            },
          },
        ]}
      />
    </DetailsCard>
  );
};
