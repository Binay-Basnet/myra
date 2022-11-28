import { FormSection } from '@myra-ui';

import { FormAmountInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const BalanceLimit = () => {
  const { t } = useTranslation();

  return (
    <FormSection header="depositProductBalanceLimit">
      <FormAmountInput name="balanceLimit.minAmount" label={t['depositProductMinimumAmount']} />
      <FormAmountInput name="balanceLimit.maxAmount" label={t['depositProductMaximumAmount']} />
    </FormSection>
  );
};
