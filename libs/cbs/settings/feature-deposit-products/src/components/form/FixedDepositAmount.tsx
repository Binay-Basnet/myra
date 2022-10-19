import { FormAmountInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const FixedDepositAmount = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="depositProductFixedDepositAmountLimit">
      <FormAmountInput
        name="fixedDepositAmountLimit.minAmount"
        label={t['depositProductMinimumAmount']}
      />

      <FormAmountInput
        name="fixedDepositAmountLimit.maxAmount"
        label={t['depositProductMaximumAmount']}
      />
    </FormSection>
  );
};
