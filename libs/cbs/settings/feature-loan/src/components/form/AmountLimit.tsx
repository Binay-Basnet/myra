import { FormSection } from '@myra-ui';

import { FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const AmountLimit = () => {
  const { t } = useTranslation();
  return (
    <FormSection header="loanProductLoanAmountLimit">
      <FormAmountInput
        type="number"
        name="minimumLoanAmount"
        label={t['loanProductMinimumAmount']}
      />
      <FormAmountInput type="number" name="maxLoanAmount" label={t['loanProductMaximumAmount']} />
    </FormSection>
  );
};
