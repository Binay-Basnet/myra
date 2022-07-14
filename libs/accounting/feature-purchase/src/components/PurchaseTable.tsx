import { useFormContext } from 'react-hook-form';

import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type PurchaseTableType = {
  product_id: string;
  quantity: number;
  rate: number;
  tax: number;
  amount: number;
  product_description?: string;
  warehouse_partition?: number;
  purchase_ledger?: string;
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

  const { watch } = useFormContext();

  const addToInventory = watch('addToInventory');

  const tableColumns = [
    {
      accessor: 'product_id',
      header: t['accountingPurchaseTableProduct'],
      cellWidth: 'auto',
      fieldType: 'search',
      searchOptions: search_options,
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
      fieldType: 'percentage',
    },
    {
      accessor: 'amount',
      header: t['accountingPurchaseTableAmount'],
      isNumeric: true,

      accessorFn: (row: PurchaseTableType) =>
        row.quantity * row.rate + (row.quantity * row.rate * row.tax) / 100,
    },
    {
      accessor: 'product_description',
      header: t['accountingPurchaseTableProductDescription'],
      hidden: true,

      fieldType: 'textarea',
    },
    {
      accessor: 'purchase_ledger',
      header: t['accountingPurchaseTablePurchaseLedger'],
      hidden: true,
      fieldType: 'select',
    },
  ];

  return (
    <FormEditableTable<PurchaseTableType>
      name="data"
      columns={
        addToInventory
          ? addToInventory === 'Yes'
            ? [
                ...tableColumns,
                {
                  accessor: 'warehouse_partition',
                  header: t['accountingPurchaseTableWarehousePartition'],
                  hidden: true,
                  fieldType: 'select',
                },
              ]
            : tableColumns
          : tableColumns
      }
    />
  );
};
