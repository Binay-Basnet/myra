import { useFormContext } from 'react-hook-form';

import { FormEditableTable } from '@coop/shared/form';

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
  const { watch } = useFormContext();

  const addToInventory = watch('addToInventory');

  const tableColumns = [
    {
      accessor: 'product_id',
      header: 'Product',
      cellWidth: 'auto',
      fieldType: 'search',
      searchOptions: search_options,
    },
    {
      accessor: 'quantity',
      header: 'Quantity',
      isNumeric: true,
    },
    {
      accessor: 'rate',
      header: 'Rate',
      isNumeric: true,
    },
    {
      accessor: 'tax',
      header: 'Tax',
      isNumeric: true,
      fieldType: 'percentage',
    },
    {
      accessor: 'amount',
      header: 'Amount',
      isNumeric: true,

      accessorFn: (row) =>
        row.quantity * row.rate + (row.quantity * row.rate * row.tax) / 100,
    },
    {
      accessor: 'product_description',
      header: 'Product Description',
      hidden: true,

      fieldType: 'textarea',
    },
    {
      accessor: 'purchase_ledger',
      header: 'Purchase Ledger',
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
                  header: 'Warehouse Partition',
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
