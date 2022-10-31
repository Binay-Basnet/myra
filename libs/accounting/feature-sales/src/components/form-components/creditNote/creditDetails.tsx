import { FormCustomerSelect, FormInput, FormLocalDatePicker } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CreditNoteDetails = () => {
  const { t } = useTranslation();

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormCustomerSelect name="customerID" label={t['accountingCreditNoteAddCustomerName']} />
      </GridItem>

      <FormLocalDatePicker name="date" label={t['accountingCreditNoteAddDate']} />

      <FormInput name="invoiceReference" label={t['accountingCreditNoteAddInvoiceReference']} />
    </FormSection>
  );
};
