import { FormInput } from '@coop/shared/form';
import { FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const BalanceLimit = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="depositProductBalanceLimit">
      <FormInput
        name="balanceLimit.minAmount"
        label={t['depositProductMinimumAmount']}
      />
      <FormInput
        name="balanceLimit.maxAmount"
        label={t['depositProductMaximumAmount']}
      />
    </FormSection>
  );
};
