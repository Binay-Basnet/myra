import { useFormContext } from 'react-hook-form';
import { FormSection } from '@myra-ui';

import { FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const BalanceLimit = () => {
  const { t } = useTranslation();
  const method = useFormContext();
  const { watch } = method;
  const minAmount = watch('balanceLimit.minAmount');

  return (
    <FormSection header="depositProductBalanceLimit">
      <FormAmountInput
        type="number"
        name="balanceLimit.minAmount"
        label={t['depositProductMinimumAmount']}
      />
      <FormAmountInput
        type="number"
        name="balanceLimit.maxAmount"
        label={t['depositProductMaximumAmount']}
        rules={{
          max: {
            value: minAmount,
            message: 'Maximum balance amount should be greater than minimum amount',
          },
        }}
      />
    </FormSection>
  );
};
