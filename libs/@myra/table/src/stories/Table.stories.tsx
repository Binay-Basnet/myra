import { Meta, Story } from '@storybook/react';

import Table from '../lib/shared-table';
import { Column, TableProps } from '../types/Table';

export default {
  component: Table,
  title: 'Myra Design System / Table / Table',
} as Meta;

type TableType = {
  id: string;
  name: string;
  address: string;
  phoneNo: string;
};

const Template: Story<TableProps<TableType>> = ({ columns, data, ...rest }) => (
  <Table data={data} columns={columns as Column<TableType>[]} {...rest} />
);

export const Primary = Template.bind({});
Primary.args = {
  data: [
    { name: 'Anjil #378393171', id: '#378393171', phoneNo: '987654321', address: 'Somewhere' },
    { name: 'Anjil #378393172', id: '#378393172', phoneNo: '987654322', address: 'Somewhere' },
    { name: 'Anjil #378393173', id: '#378393173', phoneNo: '987654321', address: 'Somewhere' },
    { name: 'Anjil #378393174', id: '#378393174', phoneNo: '987654324', address: 'Somewhere' },
    { name: 'Anjil #378393175', id: '#378393175', phoneNo: '987654321', address: 'Somewhere' },
    { name: 'Anjil #378393176', id: '#378393176', phoneNo: '987654321', address: 'Somewhere' },
    { name: 'Anjil #378393177', id: '#378393177', phoneNo: '987654321', address: 'Somewhere' },
    { name: 'Anjil #378393178', id: '#378393178', phoneNo: '987654321', address: 'Somewhere' },
  ],
  columns: [
    {
      header: 'Id',
      accessorKey: 'id',
    },
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Phone Number',
      accessorKey: 'phoneNo',
    },
    {
      header: 'Address',
      accessorKey: 'address',
    },
  ],
};
