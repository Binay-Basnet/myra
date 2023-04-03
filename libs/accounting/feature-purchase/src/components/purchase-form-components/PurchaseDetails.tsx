import { FormSection, GridItem } from '@myra-ui';

import { FormDatePicker, FormInput } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const PurchaseDetails = () => {
  const { t } = useTranslation();
  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormInput name="supplier" type="text" label={t['accountingPurchaseAddSupplierName']} />
      </GridItem>

      <FormDatePicker name="invoiceDate" label={t['accountingPurchaseAddInvoiceDate']} />

      <FormDatePicker name="dueDate" label={t['accountingPurchaseAddDueDate']} />

      <FormInput
        name="invoiceReference"
        type="text"
        label={t['accountingPurchaseAddSupplierInvoiceReference']}
      />
    </FormSection>
  );
};
