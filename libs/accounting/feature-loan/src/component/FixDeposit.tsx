import { FormSection } from '@myra-ui';

import { FormInvestmentEntrySelect } from '@coop/shared/form';

export const FixDeposit = () => (
  <FormSection>
    <FormInvestmentEntrySelect name="fixDeposit" label="Fix Deposit" type="FIXED_DEPOSIT" />
  </FormSection>
);
