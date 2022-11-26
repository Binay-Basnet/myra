import { DetailCardContent, DetailsCard } from '@myra-ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanAdditional = () => {
  const { loanPreview } = useLoanDetails();

  return (
    <DetailsCard title="Additional Features, Booleans">
      <DetailCardContent
        title="Allow Partial Installment"
        subtitle={loanPreview?.additionalFeatures?.allowPartialInstallment ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Is Monthly Interest Compulsory"
        subtitle={loanPreview?.additionalFeatures?.isMonthlyInterestCompulsory ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Insurance"
        subtitle={loanPreview?.additionalFeatures?.insurance ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Collateral"
        subtitle={loanPreview?.additionalFeatures?.collateral ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Staff Product"
        subtitle={loanPreview?.additionalFeatures?.staffProduct ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Support Multiple Account"
        subtitle={loanPreview?.additionalFeatures?.supportMultipleAccount ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Loan Schedule Change Override"
        subtitle={loanPreview?.additionalFeatures?.loanScheduleChangeOverride ? 'Yes' : 'No'}
      />
      <DetailCardContent
        title="Override Interest"
        subtitle={loanPreview?.additionalFeatures?.overrideInterest ? 'Yes' : 'No'}
      />
    </DetailsCard>
  );
};
