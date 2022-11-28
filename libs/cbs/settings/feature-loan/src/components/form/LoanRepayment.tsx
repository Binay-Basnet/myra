import { FormInput } from '@coop/shared/form';
import { FormSection } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const LoanRepayment = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="loanProductLoanRepaymentStartGraceDuration">
      <FormInput
        name="principalMaxGraceNumber"
        textAlign="right"
        label={t['loanProductMaxInstallmentPrincipal']}
      />
      <FormInput
        name="interestMaxGraceNumber"
        textAlign="right"
        label={t['loanProductMaxInstallmentInterest']}
      />
    </FormSection>
  );
};
