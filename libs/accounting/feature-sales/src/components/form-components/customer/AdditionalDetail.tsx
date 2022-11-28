import { FormAmountInput, FormEmailInput, FormInput } from '@coop/shared/form';
import { FormSection } from '@myra-ui';

export const AdditionalDetail = () => (
  <FormSection>
    <FormEmailInput name="email" label="Email Address" />

    <FormInput name="creditTerms" label="Credit Terms" />

    <FormAmountInput name="creditLimit" label="Credit Limit" />

    <FormAmountInput name="openingBalance" label="Opening Balance" />
  </FormSection>
);
