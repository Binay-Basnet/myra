import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { FormSection } from '@myra-ui';

import { FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const FixedDepositAmount = () => {
  const { t } = useTranslation();
  const method = useFormContext();
  const { watch } = method;
  const fixedMinAmount = watch('fixedDepositAmountLimit.minAmount');

  const router = useRouter();

  return (
    <FormSection header="depositProductFixedDepositAmountLimit">
      <FormAmountInput
        type="number"
        name="fixedDepositAmountLimit.minAmount"
        label={t['depositProductMinimumAmount']}
        isDisabled={router?.asPath?.includes('/edit')}
      />

      <FormAmountInput
        type="number"
        name="fixedDepositAmountLimit.maxAmount"
        label={t['depositProductMaximumAmount']}
        rules={{
          min: {
            value: fixedMinAmount,
            message: 'Fixed maximum amount should be greater than minimum amount',
          },
        }}
        isDisabled={router?.asPath?.includes('/edit')}
      />
    </FormSection>
  );
};
