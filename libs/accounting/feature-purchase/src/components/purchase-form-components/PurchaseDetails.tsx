import { useMemo } from 'react';

import { FormSection, GridItem } from '@myra-ui';

import { useGetSuppliersListQuery } from '@coop/cbs/data-access';
import { FormDatePicker, FormInput, FormSelect } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

export const PurchaseDetails = () => {
  const { t } = useTranslation();
  const { data: suppliersDetails } = useGetSuppliersListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });

  const inventoryItemsData = suppliersDetails?.inventory?.suppliers?.list?.edges;
  const supplierSearchOptions = useMemo(
    () =>
      inventoryItemsData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [inventoryItemsData]
  );
  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormSelect name="supplier" label="Select Supplier Name" options={supplierSearchOptions} />
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
