import { DetailCardContent, DetailsCard } from '@coop/shared/ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanAdditional = () => {
  const { loanProduct } = useLoanDetails();

  return (
    <DetailsCard title="Additional Features, Booleans">
      <DetailCardContent
        title="Allow Partial Installment"
        subtitle={loanProduct?.allowPartialInstallment ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Is Monthly Interest Compulsory"
        subtitle={loanProduct?.isMonthlyInstallmentCompulsory ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Insurance"
        subtitle={loanProduct?.isInsuranceApplicable ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Collateral"
        subtitle={loanProduct?.isCollateralRequired ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Staff Product"
        subtitle={loanProduct?.isStaffProduct ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Support Multiple Account"
        subtitle={loanProduct?.supportMultipleAccounts ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Loan Schedule Change Override"
        subtitle={loanProduct?.loanScheduleChangeOverride ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Waive Interest"
        subtitle={loanProduct?.waiveInterest ? 'Yes' : 'No'}
      />
    </DetailsCard>
  );
};
