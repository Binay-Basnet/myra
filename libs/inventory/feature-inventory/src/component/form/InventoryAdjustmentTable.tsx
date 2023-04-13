import { useMemo } from 'react';

import { FormSection } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useGetInventoryItemsListQuery, useGetWarehouseListQuery } from '@coop/cbs/data-access';
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

export const InventoryAdjustmentTable = () => {
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
  const { data: wareHouse } = useGetWarehouseListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });
  const warehouseData = wareHouse?.inventory?.warehouse?.listWarehouses?.edges;
  const wareHouseSearchOptions = useMemo(
    () =>
      warehouseData?.map((account) => ({
        label: account?.node?.name as string,
        value: account?.node?.id as string,
      })),
    [warehouseData]
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
      accessor: 'warehouseId',
      header: 'Warehouse',
      // hidden: true,
      fieldType: 'select',
      selectOptions: wareHouseSearchOptions,
    },
    {
      accessor: 'quantity',
      header: 'Quantity Available',

      accessorFn: (row: any) =>
        inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)
          ? (inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)?.node
              ?.itemsInWarehouses?.[row?.warehouseId] as string)
          : '',
    },
    {
      accessor: 'newQuantity',
      header: 'New Quantity',
      accessorFn: (row) => Number(row?.quantity) + Number(row?.quantityAdjusted),
    },
    {
      accessor: 'quantityAdjusted',
      header: 'Quantity Adjusted',
      isNumeric: true,
    },
  ];

  return (
    <FormSection flexLayout>
      <FormEditableTable<PurchaseAdjustmentTableType> name="itemDetails" columns={tableColumns} />
    </FormSection>
  );
};
