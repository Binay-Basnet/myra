import React from 'react';
import { Meta, Story } from '@storybook/react';
import Table from './Table';
import { Avatar, Flex, PopoverContent } from '@chakra-ui/react';
import { TableListFilterContent } from '../table-list-filter/TableListFilter';
import { Column, TableProps } from './types';

export default {
  component: Table,
  title: 'Table',
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
  member_id: number;
  name: string;
  src?: string;
  address: string;
  contact_number: string;
  date_joined: string;
};

const columns: Column<TableDummyDataType>[] = [
  {
    Header: 'Member #',
    accessor: 'member_id',
    width: 0,
    disableSortBy: false,
  },
  {
    Header: 'First Name',
    accessor: 'name',
    width: '50%',
    imgSrc: 'src',
    disableFilters: false,

    filter: 'includesSome',
    Filter: ({
      onClose,
      initialFocusRef,
      preFilteredRows,
      column: { id, setFilter, filterValue },
    }) => {
      const uniqueOptions = React.useMemo(() => {
        const options = new Set<string>();
        preFilteredRows.forEach((row) => {
          options.add(row.values[id]);
        });
        return [...Array.from(options.values())];
      }, [id, preFilteredRows]);

      return (
        <PopoverContent _focus={{ boxShadow: 'E2' }}>
          <TableListFilterContent
            onClose={onClose}
            data={uniqueOptions}
            ref={initialFocusRef}
            filterValue={filterValue}
            setFilter={setFilter}
          />
        </PopoverContent>
      );
    },
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
    Header: 'Address',
    accessor: 'address',
    maxWidth: 24,
  },
  {
    Header: 'Contact Number',
    accessor: 'contact_number',
    isNumeric: true,
  },
  {
    Header: 'Date Joined',
    accessor: 'date_joined',
    isNumeric: true,
  },
];

const data = [
  {
    member_id: 131221,
    name: 'Test User',
    src: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    address:
      'Lalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, NepalLalitpur, Nepal, Nepal ',
    contact_number: '+977-9830189301',
    date_joined: '2020-01-12',
  },
  {
    member_id: 22139,
    name: 'John Doe',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: 224,
    name: 'John Doe',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: 2139,
    name: 'Anup Shrestha',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },

  {
    member_id: 12,
    name: 'Test User',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: 24,
    name: 'Anup Shrestha',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
  {
    member_id: 2234,
    name: 'Anup Shrestha',
    address: 'Kathmandu, Nepal',
    contact_number: '+977-9833919301',
    date_joined: '2010-01-12',
  },
];

const Template: Story<TableProps<TableDummyDataType>> = (args) => (
  <Table {...args} />
);

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
