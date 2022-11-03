import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const LoanRepayment = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="loanProductLoanRepaymentStartGraceDuration">
      <FormInput
        name="minGraceDurationUnitNumber"
        textAlign="right"
        label={t['loanProductMaxInstallmentPrincipal']}
      />
      <FormInput
        name="maxGraceDurationUnitNumber"
        textAlign="right"
        label={t['loanProductMaxInstallmentInterest']}
      />
    </FormSection>
  );
};
