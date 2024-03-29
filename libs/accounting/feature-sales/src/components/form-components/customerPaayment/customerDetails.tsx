import { FormSection, GridItem } from '@myra-ui';

import { FormAmountInput, FormCustomerSelect, FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const CustomerDetails = () => {
  const { t } = useTranslation();

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormCustomerSelect
          name="receivedFrom"
          label={t['accountingCustomerPaymentAddReceivedFrom']}
        />
      </GridItem>

      <FormInput name="receivedAccount" label={t['accountingCustomerPaymentAddReceivedAccount']} />

      <FormDatePicker name="receivedDate" label={t['accountingCustomerPaymentAddReceivedDate']} />

      <FormAmountInput
        type="number"
        name="receivedAmount"
        label={t['accountingCustomerPaymentAddAmount']}
      />
    </FormSection>
  );
};
