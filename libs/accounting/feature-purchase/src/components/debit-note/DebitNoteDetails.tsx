import { FormSection, GridItem } from '@myra-ui';

import { SalesSaleEntryEntry } from '@coop/cbs/data-access';
import { FormDatePicker, FormSalesInvoiceReference, FormSupplierSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const DebitNoteDetails = ({
  getSelectedValue,
}: {
  getSelectedValue: (sales: Partial<SalesSaleEntryEntry> | null | undefined) => void;
}) => {
  const { t } = useTranslation();

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormSupplierSelect name="supplier" label="Supplier Name" />
      </GridItem>

      <FormDatePicker name="invoiceDate" label={t['accountingCreditNoteAddDate']} />

      <FormSalesInvoiceReference
        type="purchase"
        name="purchaseReference"
        label={t['accountingCreditNoteAddInvoiceReference']}
        getSelectedValue={getSelectedValue}
      />
    </FormSection>
  );
};
