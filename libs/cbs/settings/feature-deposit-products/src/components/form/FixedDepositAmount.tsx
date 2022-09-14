import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const FixedDepositAmount = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="depositProductFixedDepositAmountLimit">
      <FormInput
        textAlign="right"
        name="fixedDepositAmountLimit.minAmount"
        type="number"
        label={t['depositProductMinimumAmount']}
      />

      <FormInput
        textAlign="right"
        name="fixedDepositAmountLimit.maxAmount"
        type="number"
        label={t['depositProductMaximumAmount']}
      />
    </FormSection>
  );
};
