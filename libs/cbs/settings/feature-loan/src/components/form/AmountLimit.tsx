import { FormAmountInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const AmountLimit = () => {
  const { t } = useTranslation();
  return (
    <FormSection header="loanProductLoanAmountLimit">
      <FormAmountInput name="minimumLoanAmount" label={t['loanProductMinimumAmount']} />
      <FormAmountInput name="maxLoanAmount" label={t['loanProductMaximumAmount']} />
    </FormSection>
  );
};
