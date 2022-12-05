import { useFormContext } from 'react-hook-form';
import { FormSection } from '@myra-ui';

import { FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const AmountLimit = () => {
  const { t } = useTranslation();
  const method = useFormContext();
  const { watch } = method;
  const minLoanAmount = watch('minimumLoanAmount');

  return (
    <FormSection header="loanProductLoanAmountLimit">
      <FormAmountInput
        type="number"
        name="minimumLoanAmount"
        label={t['loanProductMinimumAmount']}
      />
      <FormAmountInput
        type="number"
        name="maxLoanAmount"
        label={t['loanProductMaximumAmount']}
        rules={{
          max: {
            value: minLoanAmount,
            message: 'Maximum loan amount should be greater than minimum amount',
          },
        }}
      />
    </FormSection>
  );
};
