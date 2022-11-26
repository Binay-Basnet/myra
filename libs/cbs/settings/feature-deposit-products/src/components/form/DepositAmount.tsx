import { FormInput } from '@coop/shared/form';
import { FormSection } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const DepositAmount = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="depositProductDepositAmountLimit">
      <FormInput name="depositAmount.minAmount" label={t['depositProductMinimumAmount']} />
      <FormInput name="depositAmount.maxAmount" label={t['depositProductMaximumAmount']} />
    </FormSection>
  );
};
