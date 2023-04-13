import { useMemo } from 'react';

import { FormSection } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useGetInventoryItemsListQuery } from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';

export type PurchaseAdjustmentTableType = {
  itemId?: string;
  quantity?: string;
  value?: string;
  warehouseId: string;
  newQuantity: string;
  quantityAdjusted: string;
  quantityAdjustedUnit: string;
  newValue: string;
};

export const InventoryAdjustmentValueTable = () => {
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

  const tableColumns: Column<PurchaseAdjustmentTableType>[] = [
    {
      accessor: 'itemId',
      header: 'Item',
      cellWidth: 'auto',
      fieldType: 'search',
      searchOptions: accountSearchOptions,
    },

    {
      accessor: 'value',
      header: 'Current Value',

      accessorFn: (row: any) =>
        inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)
          ? (inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)?.node
              ?.sellingPrice as string)
          : '',
    },
    {
      accessor: 'newValue',
      header: 'New Value',
      accessorFn: (row) => Number(row?.value) + Number(row?.quantityAdjusted),
    },
    {
      accessor: 'quantityAdjusted',
      header: 'Value Adjusted',
      isNumeric: true,
    },
  ];

  return (
    <FormSection flexLayout>
      <FormEditableTable<PurchaseAdjustmentTableType> name="valueItems" columns={tableColumns} />
    </FormSection>
  );
};
