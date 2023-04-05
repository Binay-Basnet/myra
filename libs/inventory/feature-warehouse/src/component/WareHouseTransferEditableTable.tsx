import { useMemo } from 'react';

import { FormSection } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useGetInventoryItemsListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type PurchaseTableType = {
  itemId: string;
  quantity: string;
  description: string;
};

export const WarehouseTransferTable = () => {
  const { t } = useTranslation();

  const { data: inventoryItems } = useGetInventoryItemsListQuery({
    pagination: {
      after: '',
      first: -1,
    },
  });
  const inventoryItemsData = inventoryItems?.inventory?.items?.list?.edges;
  const accountSearchOptions = useMemo(
    () =>
      inventoryItemsData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [inventoryItemsData]
  );

  // useDeepCompareEffect(() => {
  //   const hello = 'Hello';
  //   console.log({ hello });
  //   if (itemDetails) {
  //     setValue(
  //       'itemDetails',
  //       itemDetails?.map((entry) => ({
  //         itemId: entry?.itemId,
  //         quantity: entry?.quantity,
  //         rate: inventoryItemsData?.find((t) => entry?.itemId === t?.node?.id)?.node?.name,
  //         tax: entry?.tax,
  //       }))
  //     );
  //   }
  // }, [itemDetails]);
  const tableColumns: Column<PurchaseTableType>[] = [
    {
      accessor: 'itemId',
      header: t['accountingPurchaseTableProduct'],
      cellWidth: 'auto',
      fieldType: 'search',
      searchOptions: accountSearchOptions,
    },
    {
      accessor: 'quantity',
      header: t['accountingPurchaseTableQuantity'],
      // isNumeric: true,
    },
    {
      accessor: 'description',
      header: t['warehouseTransfertableDescription'],
      hidden: true,
      colSpan: 3,

      fieldType: 'textarea',
    },
  ];

  return (
    <FormSection flexLayout>
      <FormEditableTable<PurchaseTableType> name="itemDetails" columns={tableColumns} />
    </FormSection>
  );
};
