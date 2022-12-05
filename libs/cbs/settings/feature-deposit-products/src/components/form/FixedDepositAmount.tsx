import { FormSection } from '@myra-ui';

import { FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const FixedDepositAmount = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="depositProductFixedDepositAmountLimit">
      <FormAmountInput
        type="number"
        name="fixedDepositAmountLimit.minAmount"
        label={t['depositProductMinimumAmount']}
      />

      <FormAmountInput
        type="number"
        name="fixedDepositAmountLimit.maxAmount"
        label={t['depositProductMaximumAmount']}
      />
    </FormSection>
  );
};
