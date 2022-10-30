import {
  FormAmountInput,
  FormCustomerSelect,
  FormInput,
  FormLocalDatePicker,
} from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
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

      <FormLocalDatePicker
        name="receivedDate"
        label={t['accountingCustomerPaymentAddReceivedDate']}
      />

      <FormAmountInput name="receivedAmount" label={t['accountingCustomerPaymentAddAmount']} />
    </FormSection>
  );
};
