import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const AmountLimit = () => {
  const { t } = useTranslation();
  return (
    <FormSection header="loanProductLoanAmountLimit">
      <FormInput textAlign="right" name="minimumLoanAmount" label={t['loanProductMinimumAmount']} />
      <FormInput textAlign="right" name="maxLoanAmount" label={t['loanProductMaximumAmount']} />
    </FormSection>
  );
};
