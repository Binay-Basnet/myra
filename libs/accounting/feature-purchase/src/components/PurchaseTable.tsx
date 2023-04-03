import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';

import { Text } from '@myra-ui';
import { Column } from '@myra-ui/editable-table';

import { useGetInventoryItemsListQuery } from '@coop/cbs/data-access';
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

const search_options = [
  { label: 'M003 - Mi TV', value: 'm003' },
  { label: "M004 - Dell Monitor 24'' S2421HN Full HD IPS", value: 'm004' },
  { label: 'MI 003 - Lenovo Laptop', value: 'mi003' },
  { label: 'MI 004 - Lenovo Laptop', value: 'mi004' },
  { label: 'MI 005 - Lenovo Laptop', value: 'mi005' },
  { label: 'MI 006 - Lenovo Laptop', value: 'mi006' },
  { label: 'MI 007 - Lenovo Laptop', value: 'mi007' },
  { label: 'MI 008 - Lenovo Laptop', value: 'mi008' },
  { label: 'MI 009 - Lenovo Laptop', value: 'mi009' },
  { label: 'MI 0010 - Lenovo Laptop', value: 'mi0010' },
];

export const PurchaseTable = () => {
  const { t } = useTranslation();

  const { watch, setValue } = useFormContext();

  const itemDetails = watch('itemDetails') as PurchaseTableType[];
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

  useDeepCompareEffect(() => {
    const hello = 'Hello';
    console.log({ hello });
    if (itemDetails) {
      setValue(
        'itemDetails',
        itemDetails?.map((entry) => ({
          itemId: entry?.itemId,
          quantity: entry?.quantity,
          rate: inventoryItemsData?.find((t) => entry?.itemId === t?.node?.id)?.node?.name,
          tax: entry?.tax,
        }))
      );
    }
  }, [itemDetails]);
  console.log({ itemDetails });
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
      isNumeric: true,
    },
    {
      accessor: 'rate',
      header: t['accountingPurchaseTableRate'],
      isNumeric: true,
    },
    {
      accessor: 'tax',
      header: t['accountingPurchaseTableTax'],
      isNumeric: true,
      cell: (row) => {
        const account = inventoryItemsData?.find((member) => member?.node?.id === row?.itemId);

        return <Text textAlign="right">{account?.node?.name}</Text>;
      },

      fieldType: 'percentage',
    },
    {
      accessor: 'amount',
      header: t['accountingPurchaseTableAmount'],
      isNumeric: true,

      accessorFn: (row: PurchaseTableType) =>
        Number(row.quantity || 0) * Number(row.rate || 0) +
        (Number(row.quantity || 0) * Number(row.rate || 0) * Number(row.tax || 0)) / 100,
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
      hidden: true,
      fieldType: 'select',
    },
  ];

  return (
    <FormEditableTable<PurchaseTableType>
      name="itemDetails"
      columns={
        // !addToInventory || addToInventory === 'No'
        tableColumns
        // : [
        //     ...tableColumns,
        //     {
        //       accessor: 'warehouse_partition',
        //       header: t['accountingPurchaseTableWarehousePartition'],
        //       hidden: true,
        //       fieldType: 'select',
        //     },
        //   ]
      }
    />
  );
};
