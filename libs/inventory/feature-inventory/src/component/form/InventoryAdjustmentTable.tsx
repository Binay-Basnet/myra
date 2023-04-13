import { useMemo } from 'react';

import { FormSection } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import {
  InventoryAdjustmentMode,
  useGetInventoryItemsListQuery,
  useGetWarehouseListQuery,
} from '@coop/cbs/data-access';
import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type PurchaseTableType = {
  itemId?: string;
  quantity?: string;
  rate?: string;
  tax?: string;
  amount?: string;
  description?: string;
  warehouse?: string;
};

export const InventoryAdjustmentTable = ({ modeOfAdjustment }) => {
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
      header: 'Item',
      cellWidth: 'auto',
      fieldType: 'search',
      searchOptions: accountSearchOptions,
    },
    {
      accessor: 'rate',
      header:
        modeOfAdjustment === InventoryAdjustmentMode?.Quantity
          ? 'Quantity Available'
          : 'Value Available',
      accessorFn: (row: any) =>
        inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)
          ? (inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)?.node
              ?.costPrice as string)
          : '',
    },
    {
      accessor: 'tax',
      header: 'Tax(%)',

      accessorFn: (row: any) =>
        inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)
          ? String(
              inventoryItemsData?.find((item) => row?.itemId?.value === item?.node?.id)?.node
                ?.taxValue as number
            )
          : '',
    },
    {
      accessor: 'amount',
      header: t['accountingPurchaseTableAmount'],

      accessorFn: (row: PurchaseTableType) =>
        String(Number(row.quantity || 0) * Number(row.rate || 0)),
    },
    {
      accessor: 'description',
      header: t['accountingPurchaseTableProductDescription'],
      hidden: true,

      fieldType: 'textarea',
    },
    {
      accessor: 'warehouse',
      header: 'Warehouse',
      // hidden: true,
      fieldType: 'select',
      selectOptions: wareHouseSearchOptions,
    },
  ];

  return (
    <FormSection flexLayout>
      <FormEditableTable<PurchaseTableType> name="itemDetails" columns={tableColumns} />
    </FormSection>
  );
};
