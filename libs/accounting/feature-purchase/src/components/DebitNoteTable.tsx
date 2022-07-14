import { FormEditableTable } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type DebitNoteTableType = {
  product_id: string;
  quantity: number;
  rate: number;
  tax: number;
  amount: number;
  product_description?: string;
  warehouse_partition?: number;
  purchase_return_ledger?: string;
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

export const DebitNoteTable = () => {
  const { t } = useTranslation();

  return (
    <FormEditableTable<DebitNoteTableType>
      name="data"
      columns={[
        {
          accessor: 'product_id',
          header: t['accountingDebitNoteFormTableProduct'],
          cellWidth: 'auto',
          fieldType: 'search',
          searchOptions: search_options,
        },
        {
          accessor: 'quantity',
          header: t['accountingDebitNoteFormTableQuantity'],
          isNumeric: true,
        },
        {
          accessor: 'rate',
          header: t['accountingDebitNoteFormTableRate'],
          isNumeric: true,
        },
        {
          accessor: 'tax',
          header: t['accountingDebitNoteFormTableTax'],
          isNumeric: true,
          fieldType: 'percentage',
        },
        {
          accessor: 'amount',
          header: t['accountingDebitNoteFormTableAmount'],
          isNumeric: true,

          accessorFn: (row) => row.quantity * row.rate + row.tax,
        },
        {
          accessor: 'product_description',
          header: t['accountingDebitNoteFormTableProductDescription'],
          hidden: true,

          fieldType: 'textarea',
        },

        {
          accessor: 'warehouse_partition',
          hidden: true,
          header: t['accountingDebitNoteFormTableWarehousePartition'],
          fieldType: 'select',
        },
        {
          accessor: 'purchase_return_ledger',
          header: t['accountingDebitNoteFormTablePurchaseReturnLedger'],
          hidden: true,
          fieldType: 'select',
        },
      ]}
    />
  );
};
