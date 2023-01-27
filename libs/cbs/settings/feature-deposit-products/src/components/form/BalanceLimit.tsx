import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection } from '@myra-ui';

import { FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const BalanceLimit = () => {
  const { t } = useTranslation();
  const method = useFormContext();
  const { watch } = method;
  const minAmount = watch('balanceLimit.minAmount');

  const router = useRouter();

  return (
    <FormSection header="depositProductBalanceLimit">
      <FormAmountInput
        name="balanceLimit.minAmount"
        label={t['depositProductMinimumAmount']}
        isDisabled={router?.asPath?.includes('/edit')}
      />
      <FormAmountInput
        name="balanceLimit.maxAmount"
        label={t['depositProductMaximumAmount']}
        rules={{
          min: {
            value: minAmount,
            message: 'Maximum balance amount should be greater than minimum amount',
          },
        }}
        isDisabled={router?.asPath?.includes('/edit')}
      />
    </FormSection>
  );
};
