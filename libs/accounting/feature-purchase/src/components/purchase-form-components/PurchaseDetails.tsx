import { BoxContainer, InputGroupContainer } from '@coop/accounting/ui-components';
import { FormInput } from '@coop/shared/form';
import { GridItem } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

export const PurchaseDetails = () => {
  const { t } = useTranslation();
  return (
    <BoxContainer>
      <InputGroupContainer>
        <GridItem colSpan={2}>
          <FormInput
            name="supplierName"
            type="text"
            label={t['accountingPurchaseAddSupplierName']}
            __placeholder={t['accountingPurchaseAddSupplierName']}
          />
        </GridItem>

        <FormInput
          name="supplierInvoiceReference"
          type="text"
          label={t['accountingPurchaseAddSupplierInvoiceReference']}
          __placeholder={t['accountingPurchaseAddSupplierInvoiceReference']}
        />

        <FormInput name="invoiceDate" type="date" label={t['accountingPurchaseAddInvoiceDate']} />

        <FormInput name="dueDate" type="date" label={t['accountingPurchaseAddDueDate']} />
      </InputGroupContainer>
    </BoxContainer>
  );
};
