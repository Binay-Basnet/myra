import { FormSection, GridItem } from '@myra-ui';

import { SalesSaleEntryEntry } from '@coop/cbs/data-access';
import { FormCustomerSelect, FormDatePicker, FormSalesInvoiceReference } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const CreditNoteDetails = ({
  getSelectedValue,
}: {
  getSelectedValue: (sales: Partial<SalesSaleEntryEntry> | null | undefined) => void;
}) => {
  const { t } = useTranslation();

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormCustomerSelect name="customerID" label={t['accountingCreditNoteAddCustomerName']} />
      </GridItem>

      <FormDatePicker name="invoiceDate" label={t['accountingCreditNoteAddDate']} />

      <FormSalesInvoiceReference
        name="invoiceReference"
        label={t['accountingCreditNoteAddInvoiceReference']}
        getSelectedValue={getSelectedValue}
      />
    </FormSection>
  );
};
