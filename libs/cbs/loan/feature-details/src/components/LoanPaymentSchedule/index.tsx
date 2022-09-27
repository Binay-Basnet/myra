import { DetailsCard } from '@coop/shared/ui';

import { LoanPaymentScheduleTable } from '../LoanPaymentScheduleTable';
import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanPaymentSchedule = () => {
  const { loan } = useLoanDetails();
  return (
    <DetailsCard title="Payment Schedule" hasTable>
      <LoanPaymentScheduleTable
        tenure={loan?.tenure}
        gracePeriod={loan?.gracePeriod}
        interest={loan?.intrestRate}
        productId={loan?.productId}
        sanctionAmount={loan?.totalSanctionedAmount}
        repaymentScheme={loan?.repaymentScheme}
      />
    </DetailsCard>
  );
};
