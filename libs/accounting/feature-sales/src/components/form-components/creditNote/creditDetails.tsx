import { FormSection, GridItem } from '@myra-ui';

import { FormCustomerSelect, FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const CreditNoteDetails = () => {
  const { t } = useTranslation();

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormCustomerSelect name="customerID" label={t['accountingCreditNoteAddCustomerName']} />
      </GridItem>

      <FormDatePicker name="date" label={t['accountingCreditNoteAddDate']} />

      <FormInput name="invoiceReference" label={t['accountingCreditNoteAddInvoiceReference']} />
    </FormSection>
  );
};
