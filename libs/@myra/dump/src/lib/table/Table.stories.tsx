import React from 'react';
import { Avatar, Flex } from '@chakra-ui/react';
import { Meta, Story } from '@storybook/react';

import Table from './Table';
import { Column, TableProps } from './types';

export default {
  component: Table,
  title: 'Old Dump /Table / Main Table',
  argTypes: {
    isStatic: {
      control: false,
    },
    hasRowSelection: {
      control: false,
    },
  },
} as Meta;

type TableDummyDataType = {
  member_id: string;
  name: string;
  src?: string;
  age: number;
  address: string;
  contact_number: string;
  date_joined: string;
};

const columns: Column<TableDummyDataType>[] = [
  {
    Header: 'Member Id',
    accessor: 'member_id',
    width: 0,

    disableSortBy: false,
    disableFilters: false,

    filter: 'includesSome',
    filterType: 'list',
  },
  {
    Header: 'First Name',
    accessor: 'name',
    width: '50%',
    imgSrc: 'src',

    disableFilters: false,

    filter: 'includesSome',
    filterType: 'list',

    Cell: ({ cell }) => {
      return (
        <Flex alignItems="center" gap={3}>
          <Avatar src={cell.row.original?.src} name={cell.value} size="sm" />
          <span>{cell.value} </span>
        </Flex>
      );
    },
  },
  {
    Header: 'Age',
    accessor: 'age',
    maxWidth: 24,

    filter: 'numberAll',
    filterType: 'amount',
    disableFilters: false,
  },
  {
    Header: 'Address',
    accessor: 'address',
    maxWidth: 24,

    filter: 'includesSome',
    filterType: 'list',
    disableFilters: false,
  },

  {
    Header: 'Contact Number',
    accessor: 'contact_number',
    isNumeric: true,

    filterType: 'list',
    disableFilters: false,
  },
  {
    Header: 'Date Joined',
    accessor: 'date_joined',
    isNumeric: true,

    filter: 'includesSome',
    filterType: 'list',
  },
];

const data = [
  {
    member_id: '131221',
    name: 'Test User',
    age: 12,
    src: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    address:
      'Lalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, Nepal ',
    contact_number: '+977-9830189301',
    date_joined: '2020-01-12',
  },
  {
    member_id: '22139',
    age: 43,
    name: 'John Test',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '224',
    age: 94,
    name: 'John Doe',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '2139',
    name: 'Anup Shrestha',
    age: 20,
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '12',
    age: 18,
    name: 'Test User',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '24',
    name: 'Anup Shrestha',
    age: 20,
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: '2234',
    name: 'Anup Shrestha',
    age: 43,
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
];

const Template: Story<TableProps<TableDummyDataType>> = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  columns,
  data,
};

export const Compact = Template.bind({});
Compact.args = {
  columns,
  data,
  size: 'compact',
};

export const TableWithSort = Template.bind({});
TableWithSort.args = {
  columns,
  data,
  sort: true,
  disableSortAll: false,
};

export const TableWithFilter = Template.bind({});
TableWithFilter.args = {
  columns,
  data,
  filter: true,
  disableFilterAll: true,
};
