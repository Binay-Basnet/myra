import { ComponentMeta, ComponentStory } from '@storybook/react';

import EditableTable from '../lib/SharedEditableTable';

const Story: ComponentMeta<typeof EditableTable> = {
  component: EditableTable,
  title: 'Myra Design System / Table / Editable Table',
};
export default Story;

type SalesTable = {
  product_id: string;
  quantity: number;
  account_type?: string;
  rate: number;
  tax: number;
  total_amount: number;
  product_description?: string;
  warehouse_partition?: number;
  sales_ledger?: string;
};

const Template: ComponentStory<typeof EditableTable<SalesTable>> = (args) => (
  <EditableTable {...args} />
);

const searchOptions = [
  { label: 'MI 001 - Lenovo Laptop', value: 'mi001' },
  { label: 'MI 002 - Lenovo Laptop', value: 'mi002' },
  { label: 'MI 003 - Lenovo Laptop', value: 'mi003' },
  { label: 'MI 004 - Lenovo Laptop', value: 'mi004' },
  { label: 'MI 005 - Lenovo Laptop', value: 'mi005' },
  { label: 'MI 006 - Lenovo Laptop', value: 'mi006' },
  { label: 'MI 007 - Lenovo Laptop', value: 'mi007' },
  { label: 'MI 008 - Lenovo Laptop', value: 'mi008' },
  { label: 'MI 009 - Lenovo Laptop', value: 'mi009' },
  { label: 'MI 0010 - Lenovo Laptop', value: 'mi0010' },
];

export const Primary = Template.bind({});
Primary.args = {
  columns: [
    {
      accessor: 'product_id',
      header: 'Product',
      cellWidth: 'auto',
      fieldType: 'search',
      searchOptions,
    },
    {
      accessor: 'account_type',
      header: 'Account Type',
      cellWidth: 'lg',
      fieldType: 'select',
      selectOptions: [
        {
          label: 'SAVINGS',
          value: 'savings',
        },
        {
          label: 'CURRENT',
          value: 'current',
        },
      ],
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
    },
    {
      accessor: 'total_amount',
      header: 'Total Amount',
      isNumeric: true,
      accessorFn: (row) => row.quantity * row.rate + row.tax,
    },
    {
      accessor: 'product_description',
      header: 'Product Description',
      hidden: true,
      fieldType: 'textarea',
    },

    {
      accessor: 'warehouse_partition',
      hidden: true,
      header: 'Warehouse Partition',
    },
    {
      accessor: 'sales_ledger',
      hidden: true,
      header: 'Sales Ledger',
    },
  ],
  defaultData: [
    {
      product_id: 'mi001',
      quantity: 100,
      account_type: 'savings',
      rate: 40,
      tax: 400,
      total_amount: 100,
    },
    {
      product_id: 'mi002',
      quantity: 100,
      rate: 40,
      tax: 400,
      account_type: 'current',
      total_amount: 100,
    },
    {
      product_id: 'mi0010',
      quantity: 100,
      account_type: 'savings',

      rate: 40,
      tax: 400,
      total_amount: 100,
    },
  ],
};
