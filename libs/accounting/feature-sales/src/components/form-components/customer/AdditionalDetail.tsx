import { FormSection } from '@myra-ui';

import { FormAmountInput, FormEmailInput, FormInput } from '@coop/shared/form';

export const AdditionalDetail = () => (
  <FormSection>
    <FormEmailInput name="email" label="Email Address" />

    <FormInput name="creditTerms" label="Credit Terms" />

    <FormAmountInput type="number" name="creditLimit" label="Credit Limit" />

    <FormAmountInput type="number" name="openingBalance" label="Opening Balance" />
  </FormSection>
);
